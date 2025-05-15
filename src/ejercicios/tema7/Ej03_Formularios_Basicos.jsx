/**
 * @fileoverview Ejercicio sobre Formularios Básicos en React
 * @ejercicio Ej03_Formularios_Basicos
 * @tema Tema 7: Interacción con el usuario, eventos y formularios
 * @fecha 11/05/2025
 */

import { useState } from "react";
import "./Ej03_Formularios_Basicos.css";

/**
 * @function Ej03_Formularios_Basicos
 * @description Componente que demuestra el uso básico de formularios en React
 * @returns {JSX.Element} Componente con ejemplos de formularios básicos
 */
function Ej03_Formularios_Basicos() {
	// ===== HOOKS =====
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		age: "",
		gender: "",
		interests: [],
		bio: "",
		notifications: false,
		country: "",
	});

	const [formOutput, setFormOutput] = useState(null);
	const [formErrors, setFormErrors] = useState({});

	// ===== FUNCIONES AUXILIARES =====
	/**
	 * @function handleChange
	 * @description Maneja los cambios en los campos del formulario
	 * @param {React.ChangeEvent} e - Evento de cambio
	 */
	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;

		if (type === "checkbox" && name === "notifications") {
			setFormData({
				...formData,
				[name]: checked,
			});
		} else if (type === "checkbox" && name.startsWith("interest-")) {
			// Manejo de checkboxes múltiples para intereses
			const interest = name.replace("interest-", "");
			let updatedInterests = [...formData.interests];

			if (checked) {
				updatedInterests.push(interest);
			} else {
				updatedInterests = updatedInterests.filter((item) => item !== interest);
			}

			setFormData({
				...formData,
				interests: updatedInterests,
			});
		} else {
			setFormData({
				...formData,
				[name]: value,
			});
		}
	};

	/**
	 * @function validateForm
	 * @description Valida los campos del formulario
	 * @returns {boolean} True si el formulario es válido, false en caso contrario
	 */
	const validateForm = () => {
		const errors = {};

		// Validación básica
		if (!formData.username.trim()) {
			errors.username = "El nombre de usuario es obligatorio";
		}

		if (!formData.email.trim()) {
			errors.email = "El email es obligatorio";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			errors.email = "El formato del email no es válido";
		}

		if (!formData.password.trim()) {
			errors.password = "La contraseña es obligatoria";
		} else if (formData.password.length < 6) {
			errors.password = "La contraseña debe tener al menos 6 caracteres";
		}

		if (formData.age && (isNaN(formData.age) || formData.age < 18 || formData.age > 120)) {
			errors.age = "La edad debe ser un número entre 18 y 120";
		}

		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	/**
	 * @function handleSubmit
	 * @description Maneja el envío del formulario
	 * @param {React.FormEvent} e - Evento de envío del formulario
	 */
	const handleSubmit = (e) => {
		e.preventDefault();

		if (validateForm()) {
			// Mostrar los datos del formulario
			setFormOutput(formData);
			console.log("Datos del formulario:", formData);
		} else {
			console.log("Formulario con errores");
		}
	};

	/**
	 * @function resetForm
	 * @description Restablece el formulario a su estado inicial
	 */
	const resetForm = () => {
		setFormData({
			username: "",
			email: "",
			password: "",
			age: "",
			gender: "",
			interests: [],
			bio: "",
			notifications: false,
			country: "",
		});
		setFormOutput(null);
		setFormErrors({});
	};

	// Lista de intereses para checkboxes
	const interestsList = [
		{ id: "technology", label: "Tecnología" },
		{ id: "sports", label: "Deportes" },
		{ id: "music", label: "Música" },
		{ id: "books", label: "Libros" },
		{ id: "travel", label: "Viajes" },
	];

	// Lista de países para select
	const countries = [
		{ code: "", name: "Selecciona un país" },
		{ code: "ES", name: "España" },
		{ code: "MX", name: "México" },
		{ code: "AR", name: "Argentina" },
		{ code: "CO", name: "Colombia" },
		{ code: "CL", name: "Chile" },
		{ code: "PE", name: "Perú" },
		{ code: "VE", name: "Venezuela" },
		{ code: "US", name: "Estados Unidos" },
	];

	// ===== RENDER =====
	return (
		<div className="ejercicio-content dark-theme">
			<section className="concepto-section dark-theme">
				<h4>7.3 Formularios Básicos</h4>
				<p>
					Los formularios son un componente esencial para la interacción del usuario en aplicaciones web. En
					React, podemos trabajar con formularios de manera controlada (donde React controla el estado de los
					campos) o no controlada (donde el DOM mantiene el estado).
				</p>

				<div className="formularios-demo dark-theme">
					<div className="form-container dark-theme">
						<h5>Formulario de Registro</h5>

						<form
							onSubmit={handleSubmit}
							className="registro-form dark-theme">
							<div className="form-row dark-theme">
								<div className="form-group dark-theme">
									<label htmlFor="username">Nombre de usuario *</label>
									<input
										type="text"
										id="username"
										name="username"
										value={formData.username}
										onChange={handleChange}
										className={formErrors.username ? "error dark-theme" : "dark-theme"}
									/>
									{formErrors.username && (
										<div className="error-message dark-theme">{formErrors.username}</div>
									)}
								</div>

								<div className="form-group dark-theme">
									<label htmlFor="email">Email *</label>
									<input
										type="email"
										id="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										className={formErrors.email ? "error dark-theme" : "dark-theme"}
									/>
									{formErrors.email && (
										<div className="error-message dark-theme">{formErrors.email}</div>
									)}
								</div>
							</div>

							<div className="form-row dark-theme">
								<div className="form-group dark-theme">
									<label htmlFor="password">Contraseña *</label>
									<input
										type="password"
										id="password"
										name="password"
										value={formData.password}
										onChange={handleChange}
										className={formErrors.password ? "error dark-theme" : "dark-theme"}
									/>
									{formErrors.password && (
										<div className="error-message dark-theme">{formErrors.password}</div>
									)}
								</div>

								<div className="form-group dark-theme">
									<label htmlFor="age">Edad</label>
									<input
										type="number"
										id="age"
										name="age"
										value={formData.age}
										onChange={handleChange}
										min="18"
										max="120"
										className={formErrors.age ? "error dark-theme" : "dark-theme"}
									/>
									{formErrors.age && <div className="error-message dark-theme">{formErrors.age}</div>}
								</div>
							</div>

							<div className="form-group dark-theme">
								<label className="label-block">Género</label>
								<div className="radio-group dark-theme">
									<label className="radio-label dark-theme">
										<input
											type="radio"
											name="gender"
											value="male"
											checked={formData.gender === "male"}
											onChange={handleChange}
										/>
										Masculino
									</label>
									<label className="radio-label dark-theme">
										<input
											type="radio"
											name="gender"
											value="female"
											checked={formData.gender === "female"}
											onChange={handleChange}
										/>
										Femenino
									</label>
									<label className="radio-label dark-theme">
										<input
											type="radio"
											name="gender"
											value="other"
											checked={formData.gender === "other"}
											onChange={handleChange}
										/>
										Otro
									</label>
								</div>
							</div>

							<div className="form-group dark-theme">
								<label className="label-block">Intereses</label>
								<div className="checkbox-group dark-theme">
									{interestsList.map((interest) => (
										<label
											key={interest.id}
											className="checkbox-label dark-theme">
											<input
												type="checkbox"
												name={`interest-${interest.id}`}
												checked={formData.interests.includes(interest.id)}
												onChange={handleChange}
											/>
											{interest.label}
										</label>
									))}
								</div>
							</div>

							<div className="form-group dark-theme">
								<label htmlFor="country">País</label>
								<select
									id="country"
									name="country"
									value={formData.country}
									onChange={handleChange}
									className="dark-theme">
									{countries.map((country) => (
										<option
											key={country.code}
											value={country.code}>
											{country.name}
										</option>
									))}
								</select>
							</div>

							<div className="form-group dark-theme">
								<label htmlFor="bio">Biografía</label>
								<textarea
									id="bio"
									name="bio"
									value={formData.bio}
									onChange={handleChange}
									rows="4"
									className="dark-theme"
									placeholder="Cuéntanos sobre ti..."></textarea>
							</div>

							<div className="form-group checkbox-single dark-theme">
								<label className="checkbox-label dark-theme">
									<input
										type="checkbox"
										name="notifications"
										checked={formData.notifications}
										onChange={handleChange}
									/>
									Quiero recibir notificaciones
								</label>
							</div>

							<div className="form-actions dark-theme">
								<button
									type="submit"
									className="submit-btn dark-theme">
									Registrarse
								</button>
								<button
									type="button"
									onClick={resetForm}
									className="reset-btn dark-theme">
									Limpiar formulario
								</button>
							</div>
						</form>
					</div>

					<div className="form-output-container dark-theme">
						<h5>Datos del Formulario</h5>

						{formOutput ? (
							<div className="form-output dark-theme">
								<div className="output-row dark-theme">
									<span className="output-label dark-theme">Usuario:</span>
									<span className="output-value dark-theme">{formOutput.username}</span>
								</div>
								<div className="output-row dark-theme">
									<span className="output-label dark-theme">Email:</span>
									<span className="output-value dark-theme">{formOutput.email}</span>
								</div>
								<div className="output-row dark-theme">
									<span className="output-label dark-theme">Contraseña:</span>
									<span className="output-value dark-theme">
										{formOutput.password.replace(/./g, "•")}
									</span>
								</div>
								{formOutput.age && (
									<div className="output-row dark-theme">
										<span className="output-label dark-theme">Edad:</span>
										<span className="output-value dark-theme">{formOutput.age}</span>
									</div>
								)}
								{formOutput.gender && (
									<div className="output-row dark-theme">
										<span className="output-label dark-theme">Género:</span>
										<span className="output-value dark-theme">
											{formOutput.gender === "male"
												? "Masculino"
												: formOutput.gender === "female"
												? "Femenino"
												: "Otro"}
										</span>
									</div>
								)}
								{formOutput.interests.length > 0 && (
									<div className="output-row dark-theme">
										<span className="output-label dark-theme">Intereses:</span>
										<span className="output-value dark-theme">
											{formOutput.interests
												.map((interest) => {
													const interestObj = interestsList.find(
														(item) => item.id === interest
													);
													return interestObj ? interestObj.label : interest;
												})
												.join(", ")}
										</span>
									</div>
								)}
								{formOutput.country && (
									<div className="output-row dark-theme">
										<span className="output-label dark-theme">País:</span>
										<span className="output-value dark-theme">
											{countries.find((country) => country.code === formOutput.country)?.name}
										</span>
									</div>
								)}
								{formOutput.bio && (
									<div className="output-row dark-theme">
										<span className="output-label dark-theme">Biografía:</span>
										<span className="output-value dark-theme bio-output">{formOutput.bio}</span>
									</div>
								)}
								<div className="output-row dark-theme">
									<span className="output-label dark-theme">Notificaciones:</span>
									<span className="output-value dark-theme">
										{formOutput.notifications ? "Activadas" : "Desactivadas"}
									</span>
								</div>
							</div>
						) : (
							<div className="empty-output dark-theme">
								<p>Completa el formulario y haz clic en "Registrarse" para ver los datos.</p>
							</div>
						)}
					</div>
				</div>

				<div className="code-example dark-theme">
					<h5>Código: Formulario Controlado en React</h5>
					<pre className="code-snippet dark-theme">
						{`// Formulario controlado básico en React
function FormularioControlado() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      
      <button type="submit">Enviar</button>
    </form>
  );
}`}
					</pre>
				</div>
			</section>

			<div className="ejercicio-footer dark-theme">
				<h4>Conceptos clave para el examen:</h4>
				<ul className="dark-theme">
					<li>Los formularios controlados en React tienen su estado manejado por React</li>
					<li>Es necesario usar el evento onChange para actualizar el estado cuando cambian los inputs</li>
					<li>Se puede usar un solo estado (objeto) para manejar múltiples campos de formulario</li>
					<li>El evento onSubmit permite manejar el envío del formulario</li>
					<li>
						Cada tipo de input (text, checkbox, radio, select, textarea) tiene consideraciones especiales
						para su manejo
					</li>
					<li>Los campos de selección múltiple como checkboxes requieren un manejo especial para arrays</li>
					<li>Es importante validar los datos antes de enviar el formulario</li>
					<li>preventDefault() en el evento submit evita la recarga de la página</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej03_Formularios_Basicos;
