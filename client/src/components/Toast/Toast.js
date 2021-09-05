import "./Toast.css";

const Toast = (msg) => {
	var toast = document.getElementById("hidden");
	toast.className = "show";
	toast.innerText = msg;
	if (
		msg === "Email or Password Incorrect" ||
		msg === "Username already Exists" ||
		msg === "Email already Exists"
	) {
		toast.style.backgroundColor = "#bd2130";
	}
	if (msg === "Welcome to Book Forum") {
		toast.style.backgroundColor = "#007bff";
	}
	setTimeout(() => {
		toast.className = toast.className.replace("show", "");
		toast.innerHTML = "";
	}, 3000);
};

export default Toast;
