"use client"
import "./styles.scss";
import styles from "./page.module.css";
import Tabble from "@/component/customTabble/tabble";
import User from "@/component/user/user";
import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import store from "@/states/configStore"

export default function Home() {
    const [listArea, setListArea] = useState([]);

    return (
        <main className={styles.main}>
            <Provider store={store}>

                <div className="container">
                    <User
                        setListArea={setListArea}
                        listArea={listArea}
                    />
                    <Tabble listArea={listArea} />
                </div>
            </Provider>

        </main>
    );
}
