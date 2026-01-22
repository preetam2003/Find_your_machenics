import { useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

function RegisterPage({ onLogin }) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const defaultRole = searchParams.get('role') === 'mechanic' ? 'MECHANIC' : 'USER'
  
  const [step, setStep] = useState(1)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  // User details
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState(defaultRole)
  
  // Shop details (for mechanics)
  const [shopName, setShopName] = useState('')
  const [shopAddress, setShopAddress] = useState('')
  const [shopCity, setShopCity] = useState('')
  const [shopState, setShopState] = useState('')
  const [shopPincode, setShopPincode] = useState('')
  const [shopPhone, setShopPhone] = useState('')
  const [vehicleTypes, setVehicleTypes] = useState([])

  const handleVehicleTypeChange = (type) => {
    setVehicleTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    // Step 1 validation
    if (step === 1) {
      if (role === 'MECHANIC') {
        setStep(2)
        return
      }
    }

    // Step 2 validation for mechanics
    if (step === 2 && role === 'MECHANIC') {
      if (vehicleTypes.length === 0) {
        setError('Please select at least one vehicle type')
        return
      }
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          name,
          phone,
          role,
          ...(role === 'MECHANIC' && {
            shopName,
            shopAddress,
            shopCity,
            shopState,
            shopPincode,
            shopPhone,
            vehicleTypes,
          }),
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        setError(data.error || 'Registration failed')
        return
      }

      // Auto login after registration
      if (data.user && data.token) {
        onLogin(data.user, data.token)
        navigate('/')
      } else {
        navigate('/login?registered=true')
      }
    } catch (err) {
      setError('An unexpected error occurred')
      console.error('Registration error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-gray-900">MechBook</span>
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Create an account</h2>
          <p className="text-center text-gray-600 mb-4">
            {step === 1 ? 'Enter your details to get started' : 'Tell us about your shop'}
          </p>
          {role === 'MECHANIC' && (
            <div className="flex justify-center gap-2 mb-6">
              <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-primary-600' : 'bg-gray-300'}`} />
              <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-primary-600' : 'bg-gray-300'}`} />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {step === 1 && (
              <>
                <Input
                  label="Full Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                />

                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />

                <Input
                  label="Phone (Optional)"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 9876543210"
                />

                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  required
                />

                <Input
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    I am registering as
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="USER">Customer - Looking for mechanics</option>
                    <option value="MECHANIC">Mechanic - Offering services</option>
                  </select>
                </div>
              </>
            )}

            {step === 2 && role === 'MECHANIC' && (
              <>
                <Input
                  label="Shop Name"
                  type="text"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  placeholder="Your shop name"
                  required
                />

                <Input
                  label="Shop Address"
                  type="text"
                  value={shopAddress}
                  onChange={(e) => setShopAddress(e.target.value)}
                  placeholder="Street address"
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="City"
                    type="text"
                    value={shopCity}
                    onChange={(e) => setShopCity(e.target.value)}
                    placeholder="City"
                    required
                  />
                  <Input
                    label="State"
                    type="text"
                    value={shopState}
                    onChange={(e) => setShopState(e.target.value)}
                    placeholder="State"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Pincode"
                    type="text"
                    value={shopPincode}
                    onChange={(e) => setShopPincode(e.target.value)}
                    placeholder="Pincode"
                    required
                  />
                  <Input
                    label="Shop Phone"
                    type="tel"
                    value={shopPhone}
                    onChange={(e) => setShopPhone(e.target.value)}
                    placeholder="Shop phone"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Types Serviced
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={vehicleTypes.includes('TWO_WHEELER')}
                        onChange={() => handleVehicleTypeChange('TWO_WHEELER')}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">2-Wheeler</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={vehicleTypes.includes('FOUR_WHEELER')}
                        onChange={() => handleVehicleTypeChange('FOUR_WHEELER')}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">4-Wheeler</span>
                    </label>
                  </div>
                </div>
              </>
            )}

            <div className="flex gap-3">
              {step === 2 && (
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
              )}
              <Button
                type="submit"
                className="flex-1"
                isLoading={isLoading}
              >
                {step === 1 && role === 'MECHANIC' ? 'Next' : 'Create Account'}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage

