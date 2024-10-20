import React from "react";
import './Companies.css'
import github from '../../images/tech used logos/github.png'
import mongodb from '../../images/tech used logos/mongodb.svg'
import nodejspng from '../../images/tech used logos/nodejsvector.svg'
import react from '../../images/tech used logos/react.svg'
import smartpy from '../../images/tech used logos/smartpy.svg'
import tezos from '../../images/tech used logos/tezos.svg'
import EtherLink from '../../images/tech used logos/OdvnbHOy_400x400-removebg-preview 1.svg'

const Companies=()=>{
    return(
        <>
        <div className="companyheading">Tech Stack Used</div>
        <div className="CompaniesMain">
            <img src={github} alt="github" className="GitHub"/>
            <img src={mongodb} alt="mongodb" className="Mongodb"/>
            <img src={nodejspng} alt="Nodejspng" className="nodejs"/>
            <img src={react} alt="react" className="react" />
            <img src={smartpy} alt="smartpy" className="smartpy" />
            <img src={tezos} alt="tezos" className="tezos" />
            <img src={EtherLink} alt="EtherLink" className="EtherLink" />
        </div>
        </>
    )
}

export default Companies;