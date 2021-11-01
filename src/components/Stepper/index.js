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
                { props.children.map((item, index) => {
                    return <StepChecker component={item} step={index + 1}/>
                })}
            </StepCheckerContext.Provider>
        </div>
    )
}

export function StepChecker(props) {
    const currentStep = useContext(StepCheckerContext)
    return (
        <>
            { props.step === currentStep ? props.component : "" }
        </>
    )
}

export default Stepper

export function Step(props) {

    const { children } = props
    return (
            <>
                {children}
            </>
    )
}
