import React, { useState } from "react";
import styled from "styled-components";

interface Name {
    target: {value:string}
}

type Props = {}

let Button = styled.button`
    font-size: 12px;
    border: 1px solid black;
    background-color: #fff;
    height: 30px;
    margin: 10px;
    padding: 5px;
    cursor: pointer;
    transition: 0.2s ease;
    
    &:hover{  
        background-color : skyblue;
        color : blue;
    }

`

export default function Form (props: Props) {
    
    const [name, setName] = useState("");
    function handleChange ({ target: {value} }:Name) {setName(value); };

    const handleSubmit = (event:any) => {
        event.preventDefault();
        alert(`검색된 이름: ${name}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
            />
            <Button type="submit">입력</Button>
        </form>
    )
}