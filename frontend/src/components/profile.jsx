import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Profile = () => {
    const [user, setUser] = useState(null)
    useEffect(() => {
        const func = async () => {
            const resp = await axios.get(`http://localhost:3000/user/get/${localStorage.getItem("userUid")}`)
                .then((res) => {
                    setUser(res.data.data)
                    console.log(res)
                })
                .catch(e => console.log(e))
        }
        func();
    }, [])
    return (
        <div>
            {user != null &&
                <div>
                    <div>name: {user.name}</div>
                    <div>email: {user.email}</div>
                </div>
            }
        </div>
    )
}

export default Profile