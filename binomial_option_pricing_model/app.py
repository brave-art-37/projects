import streamlit as st
import pandas as pd
import math

with st.sidebar:
    S0 = st.slider('Stock Price', 0, 500, 100, 1)
    optionType = st.selectbox('Option Type', ['Call', 'Put'])
    K = st.slider('Strike Price', 0, 500, 100, 1)
    T = st.slider('Days till Expiration', 0, 252, 30, 1)
    u = st.slider('Up factor in Binomial Model', 1.1, 2.0, 1.1, 0.1)
    r = st.slider('Risk Free Rate', 0.0, u-1, 0.0, 0.01)
    N = st.slider('No. of steps in Binomial Tree', 1, 9, 9, 1)
    st.write('Assuming  Down Factor = 1/(Up Factor)  for  Recombining Binomial Tree')

def binomial_option_pricer(K, T, S0, r,N, u):
    d = 1/u
    dt = T/N
    q = (math.exp(r*dt)-d)/(u-d)
    discount = math.exp(-r*dt)

    S = [0 for e in range(N+1)]
    S[0] = S0*d**N
    for j in range(N):
        S[j+1]=S[j]*u/d

    C = [[0]*(N+1) for e in range(N+1)]
    for j in range(N+1):
        C[j][N]=max(0, S[j]-K)

    for i in range(N-1, -1, -1):
        for j in range(i+1):
            C[j][i] = discount*(q*C[j+1][i+1]+(1-q)*C[j][i+1])

    df = pd.DataFrame(C, columns=("Step %d" % i for i in range(N+1)))
    st.write('Contract Values Tree')
    st.dataframe(df)
    st.write('Value of contract is', C[0][0])

binomial_option_pricer(K, T, S0, r, N,u)
