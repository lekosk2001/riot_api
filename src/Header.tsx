import React, { useState } from "react";
import styled from "styled-components";

interface Name {
    target: {value:string}
}

type Props = {
    submit:any;
    dataKey:string;
}
const HeaderStyle = styled.header`
    width: 100%;
    top: 0px;
    background-color: #fff;
    z-index: 3;
    height: 110px;
    display: flex;
    position: fixed;
    gap: 20px;

    .logo{
        margin-left: 40px;
        display: flex;
        font-size: 18px;
        font-weight: 800;
        letter-spacing: 5px;
        align-items: center;
    }

    form{
        width: 100%;
        margin-right: 40px;
        display: flex;    
        align-items: center;
        gap:10px;

        input{
            display: flex;
            width: 100%;
            height: 50px;
            border: 0px;
            border-radius: 25px;
            background-color: hsl(0, 0%, 90%);
            padding: 0px 30px;
        }

        button{
            font-size: 12px;
            border: 1px solid black;
            background-color: #fff;
            cursor: pointer;
            transition: 0.2s ease;
            
            &:hover{  
                background-color : skyblue;
                color : blue;
            }
        }
    }

`


export default function Header (props: Props) {
    
    const [name, setName] = useState("");
    
    function handleChange ({ target: {value} }:Name) {setName(value); };

    const handleSubmit = (event:any) => {
        event.preventDefault();
        alert(`검색된 이름: ${name}`);
        props.submit(name,props.dataKey)
    };

    return (
        <HeaderStyle>
            <h2 className="logo">LGSP</h2>
            <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
            />
            <button type="submit">검색</button>
            </form>
        </HeaderStyle>

    )
}