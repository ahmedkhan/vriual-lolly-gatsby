import { useFormik } from "formik"
import React, { useState } from "react"
import Header from "../components/Header"
import { Lolly } from "../components/Lolly"
import * as Yup from "yup"
import { useMutation } from '@apollo/client'
import gql from "graphql-tag"
import { navigate } from "gatsby"
import shortid from "shortid"

const ADD_LOLLY = gql`
    mutation addLolly(
        $color1: String!, 
        $color2: String!,
        $color3: String!,
        $reciever: String!,
        $sender: String!,
        $message: String!,
        $link: String!){
            addLolly(color1: $color1,color2: $color2,color3: $color3,reciever: $reciever,sender: $sender,message: $message,link: $link){
                sender
                reciever
                message                
            }
    }
`

const DisplayingErrorMessagesSchema = Yup.object().shape({
    reciever: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    sender: Yup.string().required("Required").min(2, 'Too Short!')
        .max(50, 'Too Long!'),
    message: Yup.string().required('Required').min(2, 'Too Short')
});

const CreateNew = () => {
    const [color1, setColor1] = useState("#d52358")
    const [color2, setColor2] = useState("#e95946")
    const [color3, setColor3] = useState("#deaa43")
    const [addLolly, { data }] = useMutation(ADD_LOLLY);

    const formik = useFormik({
        initialValues: {
            reciever: '',
            sender: '',
            message: '',
        },
        validationSchema: DisplayingErrorMessagesSchema,
        onSubmit: (values, { resetForm }) => {
            const id = shortid.generate()
            addLolly({
                variables: {
                    color1, color2, color3,
                    reciever: values.reciever,
                    sender: values.sender,
                    message: values.message,
                    link: id
                }
            })
           // navigate(`/lollies/${id}`)

            resetForm({
                values: {
                    reciever: "",
                    sender: "",
                    message: ""
                }
            })
            fetch("https://api.netlify.com/build_hooks/5fdfeae11f184ac9dd8e9960", {
                method: "POST",
            })
                .then(() => console.log("hook ran"))
                .catch(() => "hook err")

        },
    });

    return (
        <div>
            <Header />

            <div className="editorRoot">
                <div className="LollyCreaterColorContainer">
                    <Lolly top={color1} middle={color2} bottom={color3} />
                </div>
                {!data ? (
                    <>
                        <div className="colorSelectorContainer">
                            <label htmlFor="flavourTop" className="colorPickerLabel">
                                <input
                                    type="color"
                                    value={color1}
                                    className="colorPicker"
                                    name="flavourTop"
                                    id="flavourTop"
                                    onChange={e => {
                                        setColor1(e.target.value)
                                    }}
                                />
                            </label>

                            <label htmlFor="flavourTop" className="colorPickerLabel">
                                <input
                                    type="color"
                                    value={color2}
                                    className="colorPicker"
                                    name="flavourTop"
                                    id="flavourTop"
                                    onChange={e => {
                                        setColor2(e.target.value)
                                    }}
                                />
                            </label>
                            <label htmlFor="flavourTop" className="colorPickerLabel">
                                <input
                                    type="color"
                                    value={color3}
                                    className="colorPicker"
                                    name="flavourTop"
                                    id="flavourTop"
                                    onChange={e => {
                                        setColor3(e.target.value)
                                    }}
                                />
                            </label>
                        </div>

                        <form className="formContainer" onSubmit={formik.handleSubmit}>
                            <label className="formLabel" htmlFor="firstName">To</label>
                            <br /> <input
                                className="inputText"
                                id="reciever"
                                name="reciever"
                                type="text"
                                placeholder="A lolly for..."
                                onChange={formik.handleChange}
                                value={formik.values.reciever}
                            />

                            {formik.errors.reciever ? <div className="formErrors">{formik.errors.reciever}</div> : null}
                            <br /> <label className="formLabel" htmlFor="message">Message</label>
                            <br /> <textarea
                                className="inputTextBox"
                                id="message"
                                name="message"
                                placeholder="Say something nice..."
                                onChange={formik.handleChange}
                                value={formik.values.message}
                            />
                            <br />
                            {formik.errors.message ? <div className="formErrors">{formik.errors.message}</div> : null}
                            <label className="formLabel" htmlFor="sender">From</label>
                            <br />
                            <input
                                className="inputText"
                                id="sender"
                                name="sender"
                                type="sender"
                                onChange={formik.handleChange}
                                value={formik.values.sender}
                                placeholder="From your friend.."
                            />
                            {formik.errors.sender ? <div className="formErrors">{formik.errors.sender}</div> : null}
                            <div className="space-mob">

                            </div>
                            <button className="submitButton" type="submit">Freeze</button>
                        </form>
                    </>
                ) : (
                        <div className="result">
                            <h4>Share lolly with this link:</h4>
                            <h3>{`https://vriual-lolly-gatsby.netlify.app/lollies/${data.link}`}</h3>
                            <div className="res_detail">
                                <p className="to">{data.reciever}</p>
                                <p className="message">{data.message}</p>
                                <p className="from">____{data.sender}</p>
                            </div>
                        </div>
                    )}
            </div>
        </div >
    )
}

export default CreateNew;