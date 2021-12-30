// import React from "react";
// import MainContainer from "components/mainContainer/MainContainer";
// import AuthTitle from "components/authTitle/AuthTitle";
// import Form from "components/form/Form";
// import Card from "components/card/Card";
// import Button from "components/button/Button";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default class Login extends React.Component {
    
    

//     manageSubmit(data) {
//         axios({
//             method: 'post',
//             url: 'http://localhost:4000/api/user/login',
//             headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json",
//             },
//             data
//         })
//         .then((res) => {
//             const navigate = useNavigate();
//             navigate('/media');
//         })
//         .catch((err) => console.error(err));
//     }
//     render() {
//         return (
//             <MainContainer>
//                 <Card>
//                     <AuthTitle>Login</AuthTitle>
//                     <Form sending={this.manageSubmit} displayPseudo={false}/>
//                     <Button>Login </Button>
//                     <div className="toggle_button">
//                         <span>Already have an account?</span>
//                         <span>
//                             <Link to="/signup">Sign Up</Link>
//                         </span>
//                     </div>
//                 </Card>
//             </MainContainer>
//         );
//     }
// }
