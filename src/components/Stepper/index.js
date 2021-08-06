import React, { createContext, useContext, useEffect, useState } from 'react'

const StepCheckerContext = createContext()

function Stepper(props) {

    const [currentStep, setCurrentStep] = useState(null)

    useEffect(() => {
        setCurrentStep(props.currentStep)
    }, [props])

    return (
        <div>
            <StepCheckerContext.Provider value={currentStep}>
                { props.children }
            </StepCheckerContext.Provider>
        </div>
    )
}

export function StepChecker(props) {

    return (
        <div></div>
    )
}

export default Stepper

export function Step(props) {

    const { children } = props
    const currentStep = useContext(StepCheckerContext)
    return (
            <>
                { props.step === currentStep ? children : "" }
            </>
    )
}
