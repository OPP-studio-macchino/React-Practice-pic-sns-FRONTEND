import React from 'react';
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';


import { client } from '../integrate';
import shareVideo from "../assets/share.mp4";
import logowhite from "../assets/logowhite.png";


const Login = () => {
    const navigate = useNavigate();
    const getUser = async(response) => {

        const decoded = jwt_decode(response.credential);

        localStorage.setItem("user", JSON.stringify(decoded));

        const {name, picture, sub} = decoded;

        const doc = {
            _id: sub,
            _type: 'user',
            userName: name,
            image: picture,
        }

        client.createIfNotExists(doc).then(() => {
					navigate("/", { replace: true });
				});
		};


    return (
			<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
				<div className="flex justify-start items-center flex-col h-screen">
					<div className="relative w-full h-full">
						<video
							src={shareVideo}
							type="video/mp4"
							loop
							controls={false}
							muted
							autoPlay
							className="w-full h-full object-cover"
						/>
						<div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
							<div className="p-5">
								<img src={logowhite} alt="logo" width="130px" />
							</div>
							<div className="shadow-2xl">
								<GoogleLogin
									onSuccess={(response) => getUser(response)}
									onFailure={() => console.log("Error")}
									cookiePolicy="single_host_origin"
									ux_mode="popup"
								/>
							</div>
						</div>
					</div>
				</div>
			</GoogleOAuthProvider>
		);
}

export default Login;