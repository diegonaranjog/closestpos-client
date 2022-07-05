// Developed by @ciucol
// 03/07/2022
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import styles from './forms.module.css'


const Form = () => {
  const [client, setClient] = useState('')
  const [pos, setPos] = useState('')
  const [get, setGet] = useState(true)

  useEffect(() => {
    try {
      console.log(client)
      const clientWithoutHashtag = client.replaceAll('#', '_')
      axios.get(`http://localhost:9000/defineroutes/closestpos?address=${clientWithoutHashtag}`)
        .then(res => setPos(res.data.message.closestPOS))
        .catch(err => console.log(err))
    } catch (error) {
      console.log(error)
    }
  }, [get])

  const handleChange = (event) => {
    setClient(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setGet(!get)
  }
  return (
    <>
      <h3>ASIGNACIÓN DE PUNTO DE VENTA</h3>
      <form onSubmit={handleSubmit} className={styles.container}>
        <label>
          Dirección del cliente:
          <br />
          <input
            type="text"
            name="address"
            value={client}
            placeholder="Ingresa la diección del cliente"
            onChange={handleChange}
            className={styles.inputAddress}
          />
        </label>
        <br />
        <br />
        <Button variant='success' type="submit" value="Submit" className={styles.button}>Consultar</Button>{' '}
      </form>
      <br />
      <div>
        Punto de venta más cercano:
        <br />
        <Alert variant="primary" className={styles.alert}>
          {pos}
        </Alert>
      </div>
    </>
  )
}
export default Form
