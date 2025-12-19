import streamlit as st
import pandas as pd
import numpy as np
import math

def N(d):
    minus_infinity=-1000
    dx=0.5
    partition=[]
    start=minus_infinity
    while(start<d):
        partition.append(start)
        start+=dx
    integral=0
    for x in partition:
        integral+=dx*(math.e)**(-x*x/2)
    integral=integral/(math.sqrt(2*math.pi))
    return integral
def N_dash(x):
    value=(math.e)**(-x*x/2)
    value=value/(math.sqrt(2*math.pi))
    return value
st.set_page_config(layout='wide')
with st.sidebar:
    spot_price=st.slider('Stock Price', 3, 500, 100, 1)
    strike_price_range=st.slider('Strike Price Range', 1, 15, 1, 1)
    time_until_expiration=st.slider('Days till Expiration', 0, 252, 30, 1)
    risk_free_rate=st.slider('Risk Free Rate', 0.0, 2.0, 0.0, 0.01)
    sigma=st.slider('Volatility', 0.1, 2.0, 0.1, 0.01)

def calculations(spot_price, strike_price, time_until_expiration, risk_free_rate):
    discount_factor=(math.e)**(-risk_free_rate*time_until_expiration)
    forward_price=spot_price/discount_factor
    
    d_plus=(math.log(forward_price/strike_price)+(sigma*sigma*time_until_expiration/2))/(sigma*math.sqrt(time_until_expiration))
    d_minus=d_plus-(sigma*math.sqrt(time_until_expiration))
    
    N_d_plus=N(d_plus)
    N_d_minus=N(d_minus)
    N_minus_d_minus=N(-d_minus)
    N_minus_d_plus=N(-d_plus)
    
    price_call=(N_d_plus*forward_price-N_d_minus*strike_price)*discount_factor
    price_put=(N_minus_d_minus*strike_price-N_minus_d_plus*forward_price)*discount_factor
    
    delta_call=N_d_plus
    delta_put=-N_minus_d_plus
    
    gamma_call= N_dash(d_plus)/(spot_price*sigma*math.sqrt(time_until_expiration))
    gamma_put= gamma_call
    
    theta_call=(-forward_price*N_dash(d_plus)*sigma/(2*math.sqrt(time_until_expiration))-N_d_minus*risk_free_rate*strike_price)*discount_factor
    theta_put=(-forward_price*N_dash(d_plus)*sigma/(2*math.sqrt(time_until_expiration))+N_minus_d_minus*risk_free_rate*strike_price)*discount_factor
    return (theta_call, gamma_call, delta_call, price_call, strike_price, price_put, delta_put, gamma_put, theta_put)

call_theta=[]
call_gamma=[]
call_delta=[]
call_price=[]
strike_price_data=[]
put_price=[]
put_delta=[]
put_gamma=[]
put_theta=[]

temp_strike_price=spot_price-strike_price_range
while(temp_strike_price<=spot_price+strike_price_range):
    data=calculations(spot_price, temp_strike_price, time_until_expiration, risk_free_rate)
    call_theta.append(data[0])
    call_gamma.append(data[1])
    call_delta.append(data[2])
    call_price.append(data[3])
    strike_price_data.append(data[4])
    put_price.append(data[5])
    put_delta.append(data[6])
    put_gamma.append(data[7])
    put_theta.append(data[8])
    temp_strike_price+=1
table={
    "Call Theta": call_theta,
    "Call Gamma": call_gamma,
    "Call Delta": call_delta,
    "Call Price": call_price,
    "Strike Price": strike_price_data,
    "Put Price": put_price,
    "Put Delta": put_delta,
    "Put Gamma": put_gamma,
    "Put Theta": put_theta
}
df = pd.DataFrame(table)
st.dataframe(df, use_container_width=True)
