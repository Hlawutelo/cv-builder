import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    setLoading(false)
    if (error) {
      alert(error.message)
    } else {
      alert('Check your email to confirm your account.')
    }
  }

  return (
    <form onSubmit={handleSignup}>
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Account'}
      </button>
    </form>
  )
}

export default Signup
