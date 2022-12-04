import "./App.css"
import { useState, FormEvent} from "react"

interface formModel {
	name: string
	description: string
	partner: string
}

function App() {

	const initialFormState: formModel= {				
		name: "",
		description: "",
		partner: ""
	}

	const submitForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log(formState)
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormState(values => ({...values, [name]: value}))
	}

	const [formState,setFormState]=useState(initialFormState)
  
	return (
		<form onSubmit={(e)=>submitForm(e)}>
			<input 
				placeholder="NFT NAME" 
				name="name"
				value={formState.name || ""}
				onChange={handleChange}
				/>
			<br/>	

			<input 
				placeholder="NFT DESCRIPTION"
				name="description"
				value={formState.description || ""}
				onChange={handleChange}
				/>
			<br/>
		
			<input id="partner" 
				placeholder="PARTNER NAME"
				name="partner"
				value={formState.partner || ""}
				onChange={handleChange}
				/>
			<br/>
		
			<button type="submit">SUBMIT</button>
		</form>
	)
}

export default App
