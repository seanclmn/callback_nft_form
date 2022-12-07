import "./App.css"
import { useState, FormEvent,ChangeEvent} from "react"
import axios from 'axios'
interface formModel { name: string
	description: string
	partner: string
}

const postNft = async (payload: formModel) => {
	const token = `${import.meta.env.VITE_GCLOUD_TOKEN}`
	const path = `${import.meta.env.VITE_GCLOUD_FUNCTION_URL}/register-nft`
	const config = {
    headers: {
      // 'Authorization': `Bearer ${import.meta.env.VITE_GCLOUD_TOKEN}`,
			'Content-Type': 'application/json'
    }
  }
	try {
		const res = await axios.post(path,payload,config)
		console.log(res)
	}
	catch(error) {
		console.log(error)
	}	

}

function App() {

	const initialFormState: formModel= {				
		name: "",
		description: "",
		partner: ""
	}

	const submitForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		postNft(formState)
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormState(values => ({...values, [name]: value}))
	}

	const [formState,setFormState]=useState(initialFormState)
  
	return (
		<form 
			onSubmit={(e)=>submitForm(e)}
			>

			<h1>REGISTER YOUR NFT</h1>

			<input 
				placeholder="NFT NAME" 
				name="name"
				value={formState.name}
				onChange={handleChange}
				/>
			<br/>	

			<input 
				placeholder="NFT DESCRIPTION"
				name="description"
				value={formState.description}
				onChange={handleChange}
				/>
			<br/>
		
			<input id="partner" 
				placeholder="PARTNER NAME"
				name="partner"
				value={formState.partner}
				onChange={handleChange}
				/>
			<br/>

			{<p id="error-message">Please enter all details.</p>}
		
			<button 
				type="submit"
				id="submit-button"
				disabled={!formState.name || !formState.description || !formState.partner}
				>
				SUBMIT
			</button>
		</form>
	)
}

export default App
