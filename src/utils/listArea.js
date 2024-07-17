import { useState, useEffect } from "react";
import callApi from "@/callApi/callApi";
import { Button } from "antd";

export default function ListArea({ list, setListArea, setAreaCost }) {
    const [listA, setListA] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await Promise.all(list.map(async (_id) => {
                    const response = await callApi("GET", "markets/detail", { _id: _id });
                    return response.data;
                }));
                setListA(data);
                setListArea(data);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setListA([]);
            }
        }
        fetchData();
    }, [list]);

    const handleDelete = async (area) => {
        try {
            await callApi("PUT", "user/updateArea", { areaCost: listA.filter((item) => item._id !== area._id).map(item => item._id) });
            const updatedList = listA.filter((item) => item._id !== area._id);
            setListA(updatedList);
            setListArea(updatedList);
            setAreaCost(updatedList);
        } catch (error) {
            console.error("Error deleting area: ", error);
        }
    };

    return (
        <>
            {listA.map((area, index) => (
                <li key={index} className="areaCost">{area.name}
                    <Button type="primary" onClick={() => handleDelete(area)}>
                        Xóa
                    </Button>
                </li>
            ))}
        </>
    );
}
