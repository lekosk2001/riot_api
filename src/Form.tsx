import React, { useState } from "react";
import styled from "styled-components";

interface Name {
    target: {value:string}
}

type Props = {
    submit:any;
    dataKey:string;
}

let Button = styled.button`
    font-size: 12px;
    border: 1px solid black;
    background-color: #fff;
    height: 50px;
    width: 50px;
    cursor: pointer;
    transition: 0.2s ease;
    
    &:hover{  
        background-color : skyblue;
        color : blue;
    }
`
const Header = styled.header`
    height: 110px;
    display: flex;
    padding: 0px 40px;
    gap: 20px;
`
const Logo = styled.div`
    display: flex;
    font-size: 18px;
    font-weight: 800;
    letter-spacing: 5px;
    align-items: center;
`

const Formhtml = styled.form`
    display: flex;    
    align-items: center;
    gap:10px;
`

const Input = styled.input`
    /* display: flex; */
    width: 100%;
    height: 50px;
    border: 0px;
    border-radius: 25px;
    background-color: hsl(0, 0%, 90%);
    padding: 0px 30px;
`

export default function Form (props: Props) {
    
    const [name, setName] = useState("");
    
    function handleChange ({ target: {value} }:Name) {setName(value); };

    const handleSubmit = (event:any) => {
        event.preventDefault();
        alert(`검색된 이름: ${name}`);
        props.submit(name,props.dataKey)
    };

    return (
        <Header>
            <Logo>LGSP</Logo>
            <Formhtml onSubmit={handleSubmit}>
            <Input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
            />
            <Button type="submit"></Button>
            </Formhtml>
        </Header>

    )
}