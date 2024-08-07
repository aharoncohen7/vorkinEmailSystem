import React, { useEffect } from 'react'
import styles from './style.module.css'
import { FaSearch } from "react-icons/fa";

const InputSearch = ({loading, sendInput }) => {
    const [text, setText] = React.useState("");

    return (
        <div className={styles.main}>
            <input className={styles.input} type="text" placeholder='Search...' onChange={(e) => {
                setText(e.target.value)
                // if(e.target.value.length>2 || e.target.value == ""){
                sendInput(e.target.value)}
            // }
            } maxLength={30} />
            <FaSearch className={loading ? styles.loading : ""} />
        </div>
    )
}

export default InputSearch
