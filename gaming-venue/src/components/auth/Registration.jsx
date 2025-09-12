import React, { useState } from 'react'
import { registerationUser } from '../utils/ApiFunctions'
import { Link, useNavigate } from 'react-router-dom'

const Registration = () => {

    const[registeration, setRegistration] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate()
    
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const handleInputChange = (e) => {
        setRegistration({...registeration, [e.target.name]: e.target.value})
    }

    const handleRegistration = async(e) => {
        e.preventDefault()
        try {
            const result = await registerationUser(registeration)
            setSuccessMessage(result)
            setErrorMessage('')
            navigate("/login", { replace: true })
            setRegistration({
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            })
            
        } catch (error) {
            setSuccessMessage('')
            setErrorMessage(`Registration error: ${error.message}`)
        }

        setTimeout(() => {
            setErrorMessage('')
            setSuccessMessage('')
        }, 5000)
    }

  return (
    <section className='container col-6 mt-5 mb-5'>
      {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
        <h2>Register</h2>
        <form onSubmit={handleRegistration}>
            <div className='row mb-3'>
                <label htmlFor="firstName" className='col-sm-2 col-form-label'>First Name</label>
                <div>
                    <input 
                    id='firstName'
                    name='firstName'
                    type='firstName'
                    className='form-control'
                    value={registeration.firstName}
                    onChange={handleInputChange} 
                    />
                </div>
            </div>
            <div className='row mb-3'>
                <label htmlFor="lastName" className='col-sm-2 col-form-label'>Last Name</label>
                <div>
                    <input 
                    id='lastName'
                    name='lastName'
                    type='lastName'
                    className='form-control'
                    value={registeration.lastName}
                    onChange={handleInputChange} 
                    />
                </div>
            </div>
            <div className='row mb-3'>
                <label htmlFor="email" className='col-sm-2 col-form-label'>Email</label>
                <div>
                    <input 
                    id='email'
                    name='email'
                    type='email'
                    className='form-control'
                    value={registeration.email}
                    onChange={handleInputChange} 
                    />
                </div>
            </div>
            <div className='row mb-3'>
                <label htmlFor="password" className='col-sm-2 col-form-label'>Password</label>
                <div>
                    <input 
                    id='password'
                    name='password'
                    type='password'
                    className='form-control'
                    value={registeration.password}
                    onChange={handleInputChange} 
                    />
                </div>
            </div>
            <div className='mb-3'>
                <button 
                type='submit' 
                className='btn btn-primary'
                style={{marginRight: '10px'}}
                >
                    Register
                </button>
                <span style={{marginLeft: '10px'}}>
                    Already have an account?<Link to="/login">Login</Link>
                </span>
            </div>
        </form>
    </section>
  )
}

export default Registration
