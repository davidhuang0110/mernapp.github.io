// shortcut "rfce"
import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import { getGoals } from '../features/goals/goalSlice'
import { reset } from '../features/auth/authSlice'

function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth)
    const {goals, isLoading, isError, message} = useSelector((state) => state.goals)

    // The useEffect hook in React is used to perform side effects in functional components.
    // if no user login, do not display dashboard
    useEffect(() => {
        if(isError) {
            console.log(message)
        }
        else {
            dispatch(getGoals())
        }

        if(!user) {
            navigate('/login')
        }

        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])

    if(isLoading) {
        return <Spinner />
    }

    // "{user && user.name}": If user exists, user.name will be accessed and rendered within the
    return (
        <>
            <section className="heading">
                <h1>Welcome {user && user.name}</h1>
                <p>Goals Dashboard</p>
            </section>

            <GoalForm />

            <section className="content">
                {goals.length > 0 ? (
                    <div className="goals">
                        {goals.map((goal) => (
                            <GoalItem key={goal._id} goal={goal}/>
                        ))}
                    </div>
                ) : (<h3>You have not set any goals</h3>)}
            </section>
        </>
    )
}

export default Dashboard