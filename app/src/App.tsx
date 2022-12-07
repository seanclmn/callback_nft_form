import "./App.css"
import { useState, FormEvent,ChangeEvent} from "react"
import axios from 'axios'
interface formModel { name: string
	description: string
	partner: string
}

function App() {

	const postNft = async (payload: formModel) => {
		const token = `${import.meta.env.VITE_GCLOUD_TOKEN}`
		const path = `${import.meta.env.VITE_GCLOUD_FUNCTION_URL}/register-nft`
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		try {
			setLoading(true)
			const res = await axios.post(path,payload,config)
			setFormState(initialFormState)
			setLoading(false)
			setShowErrors(false)
			console.log(res)
		}
		catch(error) {
			console.log(error)
		}	
	
	}

	const initialFormState: formModel= {				
		name: "",
		description: "",
		partner: ""
	}

	const submitForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if(formErrors) {
			setShowErrors(true)
		}
		else {
			postNft(formState)
		}
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormState(values => ({...values, [name]: value}))
	}

	const [formState,setFormState]=useState(initialFormState)
	const [showErrors,setShowErrors]=useState(false)
	const [loading,setLoading]=useState(false)
	const formErrors = Object.values(formState).includes("")
	console.log(formErrors)
  
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

			{(showErrors && formErrors) && <p id="error-message">Please enter all details.</p>}
			{loading? 
				<button 
					type="submit"
					id="submit-button"
					disabled
					>
					LOADING...
				</button>
				: 
				<button 
					type="submit"
					id="submit-button"
					>
					SUBMIT
				</button>
				}
		</form>
	)
}

export default App
