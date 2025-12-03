import { useState, useContext } from "react";
import { Mail, Lock } from "lucide-react";
import Swal from "sweetalert2";
import { loginService } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../services/authContext";



const Login = () => {
  const { login } = useContext(AuthContext);
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  if (!correo || !clave) {
    Swal.fire("Error", "Todos los campos son obligatorios", "error");
    return;
  }

  try {
  const result = await loginService(correo, clave);

  // Guarda token y email
  localStorage.setItem("token", result.data.token);
  localStorage.setItem("email", result.data.email);
  localStorage.setItem("role", result.data.role);

  // console.log("TOKEN:", result.data.token);
  // console.log("Role:", result.data.role);

  Swal.fire("Bienvenido", "Inicio de sesión exitoso", "success");

  login(result.data.token);

  navigate("/");
} catch (err) {
  Swal.fire("Error", err.message || "Credenciales incorrectas", "error");
}
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-full max-w-sm bg-base-100 shadow-md p-4">
        <h2 className="text-2xl font-bold text-center mb-4">Iniciar sesión</h2>

        <form onSubmit={handleLogin} className="space-y-4">

          <label className="input input-bordered flex items-center w-full gap-2 h-12">
            <Mail size={18} />
            <input
              type="email"
              className="grow"
              placeholder="Correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </label>

          <label className="input input-bordered flex items-center w-full gap-2 h-12">
            <Lock size={18} />
            <input
              type="password"
              className="grow"
              placeholder="Contraseña"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
            />
          </label>

          <button type="submit" className="btn btn-primary w-full">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;