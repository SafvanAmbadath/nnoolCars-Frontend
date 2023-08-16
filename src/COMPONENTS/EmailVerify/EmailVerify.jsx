import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../images/success.png";
import styles from "./styles.module.css";
// import { Fragment } from "react/cjs/react.production.min";
import { getVerifyUser } from "../../API/SERVICES/auth";

const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(false);
	const params = useParams();

	useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
				// const url = `http://localhost:4000/api/users/${params.id}/verify/${params.token}`;
				const { data } = await getVerifyUser(params.id,params.token);
                console.log(data);
				console.log("emailverifyurl "+data);
				setValidUrl(true);
			} catch (error) {
				console.log("emailverifyerror "+error);
				
			}
		};
		verifyEmailUrl();
	}, []);

	return (
		<>
			{validUrl ? (
				<div className={styles.container}>
					<img src={success} alt="success_img" className={styles.success_img} />
					<h1>Email verified successfully</h1>
					<Link to="/login">
						<button className={styles.green_btn}>Login</button>
					</Link>
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</>
	);
};

export default EmailVerify;
