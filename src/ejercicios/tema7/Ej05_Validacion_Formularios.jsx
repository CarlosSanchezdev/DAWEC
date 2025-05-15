/**
 * @fileoverview Ejercicio sobre Validación de Formularios
 * @ejercicio Ej05_Validacion_Formularios
 * @tema Tema 7: Interacción con el usuario, eventos y formularios
 * @fecha 11/05/2025
 */

import { useState, useEffect } from "react";
import "./Ej05_Validacion_Formularios.css";

/**
 * @function Ej05_Validacion_Formularios
 * @description Componente que demuestra técnicas de validación de formularios en React
 * @returns {JSX.Element} Componente con ejemplos de validación de formularios
 */
function Ej05_Validacion_Formularios() {
	// ===== HOOKS =====
	// Estado inicial del formulario
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
		phone: "",
		website: "",
		age: "",
		postalCode: "",
		creditCard: "",
		bio: "",
	});

	// Estado para errores de validación
	const [errors, setErrors] = useState({});

	// Estado para indicar si el formulario fue enviado
	const [isSubmitted, setIsSubmitted] = useState(false);

	// Estado para mostrar los datos procesados
	const [processedData, setProcessedData] = useState(null);

	// Estado para indicar si el formulario se está enviando
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Estado para estrategia de validación
	const [validationStrategy, setValidationStrategy] = useState("onChange");

	// Estado para seguimiento de campos tocados (para validación onBlur)
	const [touchedFields, setTouchedFields] = useState({});

	// ===== EFECTOS =====
	// Efecto para validar el formulario cuando cambia la estrategia
	useEffect(() => {
		if (validationStrategy === "onChange") {
			validateForm();
		}
	}, [formData, validationStrategy]);

	// ===== VALIDACIÓN =====
	/**
	 * @function validateField
	 * @description Valida un campo específico del formulario
	 * @param {string} name - Nombre del campo a validar
	 * @param {string} value - Valor del campo
	 * @returns {string|null} Mensaje de error o null si es válido
	 */
	const validateField = (name, value) => {
		// Expresiones regulares para validación
		const patterns = {
			username: /^[a-zA-Z0-9_]{4,20}$/,
			email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
			password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
			phone: /^\+?[0-9]{9,15}$/,
			website: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/,
			age: /^(1[8-9]|[2-9][0-9]|1[0-4][0-9]|150)$/,
			postalCode: /^[0-9]{5}$/,
			creditCard: /^[0-9]{16}$/,
		};

		// Mensajes de error
		const errorMessages = {
			username: "El nombre de usuario debe tener entre 4 y 20 caracteres alfanuméricos o guiones bajos",
			email: "Introduce un correo electrónico válido",
			password:
				"La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales",
			confirmPassword: "Las contraseñas no coinciden",
			phone: "Introduce un número de teléfono válido (9-15 dígitos)",
			website: "Introduce una URL válida",
			age: "La edad debe estar entre 18 y 150 años",
			postalCode: "El código postal debe tener 5 dígitos",
			creditCard: "La tarjeta de crédito debe tener 16 dígitos",
			bio: "La biografía no puede exceder los 500 caracteres",
		};

		// Validaciones personalizadas
		switch (name) {
			case "username":
				if (!value.trim()) return "El nombre de usuario es obligatorio";
				if (!patterns.username.test(value)) return errorMessages.username;
				break;

			case "email":
				if (!value.trim()) return "El correo electrónico es obligatorio";
				if (!patterns.email.test(value)) return errorMessages.email;
				break;

			case "password":
				if (!value) return "La contraseña es obligatoria";
				if (!patterns.password.test(value)) return errorMessages.password;
				break;

			case "confirmPassword":
				if (!value) return "Debes confirmar la contraseña";
				if (value !== formData.password) return errorMessages.confirmPassword;
				break;

			case "phone":
				if (value && !patterns.phone.test(value)) return errorMessages.phone;
				break;

			case "website":
				if (value && !patterns.website.test(value)) return errorMessages.website;
				break;

			case "age":
				if (value && !patterns.age.test(value)) return errorMessages.age;
				break;

			case "postalCode":
				if (value && !patterns.postalCode.test(value)) return errorMessages.postalCode;
				break;

			case "creditCard":
				if (value && !patterns.creditCard.test(value)) return errorMessages.creditCard;
				break;

			case "bio":
				if (value.length > 500) return errorMessages.bio;
				break;

			default:
				return null;
		}

		return null;
	};

	/**
	 * @function validateForm
	 * @description Valida todo el formulario
	 * @returns {boolean} True si el formulario es válido
	 */
	const validateForm = () => {
		const newErrors = {};
		let isValid = true;

		// Validar cada campo
		Object.entries(formData).forEach(([name, value]) => {
			// En validación onBlur, solo validar campos que han sido "tocados"
			if (validationStrategy === "onBlur" && !touchedFields[name]) {
				return;
			}

			const error = validateField(name, value);
			if (error) {
				newErrors[name] = error;
				isValid = false;
			}
		});

		setErrors(newErrors);
		return isValid;
	};

	// ===== MANEJADORES DE EVENTOS =====
	/**
	 * @function handleChange
	 * @description Maneja cambios en los campos del formulario
	 * @param {React.ChangeEvent} e - Evento de cambio
	 */
	const handleChange = (e) => {
		const { name, value } = e.target;

		// Actualizar estado del formulario
		setFormData({
			...formData,
			[name]: value,
		});

		// Validar inmediatamente si la estrategia es onChange
		if (validationStrategy === "onChange") {
			const error = validateField(name, value);
			setErrors({
				...errors,
				[name]: error,
			});
		}
	};

	/**
	 * @function handleBlur
	 * @description Maneja evento de pérdida de foco en campos
	 * @param {React.FocusEvent} e - Evento de blur
	 */
	const handleBlur = (e) => {
		const { name, value } = e.target;

		// Marcar campo como "tocado"
		setTouchedFields({
			...touchedFields,
			[name]: true,
		});

		// Validar si la estrategia es onBlur
		if (validationStrategy === "onBlur") {
			const error = validateField(name, value);
			setErrors({
				...errors,
				[name]: error,
			});
		}
	};

	/**
	 * @function handleSubmit
	 * @description Maneja el envío del formulario
	 * @param {React.FormEvent} e - Evento de submit
	 */
	const handleSubmit = async (e) => {
		e.preventDefault();

		// Marcar todos los campos como tocados
		const allTouched = Object.keys(formData).reduce((acc, field) => {
			acc[field] = true;
			return acc;
		}, {});

		setTouchedFields(allTouched);

		// Validar formulario completo (independiente de la estrategia)
		const isValid = validateForm();

		if (isValid) {
			// Simular envío a servidor
			setIsSubmitting(true);

			try {
				// Simular respuesta del servidor
				await new Promise((resolve) => setTimeout(resolve, 1500));

				// Procesar datos (por ejemplo, formatear o sanitizar)
				const processed = processFormData(formData);
				setProcessedData(processed);
				setIsSubmitted(true);

				console.log("Datos enviados y procesados:", processed);
			} catch (error) {
				console.error("Error al procesar el formulario:", error);
				setErrors({
					...errors,
					form: "Error al procesar el formulario. Inténtalo de nuevo.",
				});
			} finally {
				setIsSubmitting(false);
			}
		} else {
			console.log("Formulario inválido");
		}
	};

	/**
	 * @function handleStrategyChange
	 * @description Cambia la estrategia de validación
	 * @param {React.ChangeEvent} e - Evento de cambio
	 */
	const handleStrategyChange = (e) => {
		setValidationStrategy(e.target.value);

		// Resetear errores al cambiar estrategia
		setErrors({});
		setTouchedFields({});
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
			confirmPassword: "",
			phone: "",
			website: "",
			age: "",
			postalCode: "",
			creditCard: "",
			bio: "",
		});
		setErrors({});
		setTouchedFields({});
		setIsSubmitted(false);
		setProcessedData(null);
	};

	// ===== PROCESAMIENTO DE DATOS =====
	/**
	 * @function processFormData
	 * @description Procesa y sanitiza los datos del formulario
	 * @param {Object} data - Datos del formulario
	 * @returns {Object} Datos procesados
	 */
	const processFormData = (data) => {
		// Sanitizar y formatear datos
		const processed = { ...data };

		// Formatear email a minúsculas
		processed.email = processed.email.toLowerCase().trim();

		// No incluir contraseñas en datos procesados (por seguridad)
		delete processed.password;
		delete processed.confirmPassword;

		// Formatear teléfono (eliminar caracteres no numéricos)
		if (processed.phone) {
			processed.phone = processed.phone.replace(/[^\d+]/g, "");
		}

		// Asegurar que website tiene protocolo
		if (processed.website && !processed.website.startsWith("http")) {
			processed.website = "https://" + processed.website;
		}

		// Convertir edad a número
		if (processed.age) {
			processed.age = parseInt(processed.age, 10);
		}

		// Sanitizar código postal (solo dígitos)
		if (processed.postalCode) {
			processed.postalCode = processed.postalCode.replace(/\D/g, "");
		}

		// Enmascarar número de tarjeta
		if (processed.creditCard) {
			const lastFour = processed.creditCard.slice(-4);
			processed.creditCard = `XXXX-XXXX-XXXX-${lastFour}`;
		}

		// Sanitizar bio (eliminar HTML)
		if (processed.bio) {
			processed.bio = processed.bio
				.replace(/<[^>]*>/g, "") // Eliminar etiquetas HTML
				.trim();
		}

		return processed;
	};

	// ===== RENDER =====
	return (
		<div className="ejercicio-content dark-theme">
			<section className="concepto-section dark-theme">
				<h4>7.5 Validación de Formularios</h4>
				<p>
					La validación de formularios es esencial para garantizar que los datos ingresados por el usuario
					cumplan con los requisitos de formato y contenido antes de ser procesados. En React, hay múltiples
					estrategias para validar formularios, desde validación en tiempo real hasta validación al envío.
				</p>

				<div className="validation-container dark-theme">
					<div className="strategies-section dark-theme">
						<h5>Estrategias de Validación</h5>
						<div className="strategy-selector dark-theme">
							<label>
								<input
									type="radio"
									name="validationStrategy"
									value="onChange"
									checked={validationStrategy === "onChange"}
									onChange={handleStrategyChange}
								/>
								<span>Validación al cambiar (onChange)</span>
							</label>

							<label>
								<input
									type="radio"
									name="validationStrategy"
									value="onBlur"
									checked={validationStrategy === "onBlur"}
									onChange={handleStrategyChange}
								/>
								<span>Validación al perder foco (onBlur)</span>
							</label>

							<label>
								<input
									type="radio"
									name="validationStrategy"
									value="onSubmit"
									checked={validationStrategy === "onSubmit"}
									onChange={handleStrategyChange}
								/>
								<span>Validación al enviar (onSubmit)</span>
							</label>

							<div className="strategy-description dark-theme">
								{validationStrategy === "onChange" && (
									<p>
										La validación se realiza en tiempo real mientras el usuario escribe. Proporciona
										retroalimentación inmediata pero puede ser intrusiva.
									</p>
								)}
								{validationStrategy === "onBlur" && (
									<p>
										La validación se realiza cuando el usuario abandona un campo. Un buen equilibrio
										entre inmediatez y no ser intrusivo.
									</p>
								)}
								{validationStrategy === "onSubmit" && (
									<p>
										La validación se realiza solo cuando el usuario envía el formulario. Menos
										intrusiva pero no proporciona retroalimentación temprana.
									</p>
								)}
							</div>
						</div>
					</div>

					<div className="form-wrapper dark-theme">
						{isSubmitted ? (
							<div className="submission-success dark-theme">
								<h5>¡Formulario enviado con éxito!</h5>
								<div className="processed-data dark-theme">
									<h6>Datos procesados:</h6>
									<div className="data-table dark-theme">
										{Object.entries(processedData).map(
											([key, value]) =>
												value && (
													<div
														key={key}
														className="data-row dark-theme">
														<span className="data-label dark-theme">{key}:</span>
														<span className="data-value dark-theme">
															{typeof value === "object"
																? JSON.stringify(value)
																: value.toString()}
														</span>
													</div>
												)
										)}
									</div>

									<div className="processing-info dark-theme">
										<h6>Nota: Procesamiento realizado</h6>
										<ul className="dark-theme">
											<li>Email: convertido a minúsculas</li>
											<li>Contraseñas: eliminadas por seguridad</li>
											<li>Teléfono: formato limpio</li>
											<li>Website: añadido protocolo https://</li>
											<li>Tarjeta: enmascarada excepto últimos 4 dígitos</li>
											<li>Bio: HTML eliminado</li>
										</ul>
									</div>

									<button
										onClick={resetForm}
										className="reset-btn dark-theme">
										Comenzar de nuevo
									</button>
								</div>
							</div>
						) : (
							<form
								onSubmit={handleSubmit}
								className="validation-form dark-theme">
								<h5>Formulario con Validación</h5>

								<fieldset className="form-section dark-theme">
									<legend>Información de Cuenta</legend>

									<div className="form-row dark-theme">
										<div className="form-group dark-theme">
											<label htmlFor="username">
												Nombre de usuario *
												<span className="field-description dark-theme">
													(4-20 caracteres, solo letras, números y _)
												</span>
											</label>
											<input
												type="text"
												id="username"
												name="username"
												value={formData.username}
												onChange={handleChange}
												onBlur={handleBlur}
												className={errors.username ? "error dark-theme" : "dark-theme"}
											/>
											{errors.username && (
												<div className="error-message dark-theme">{errors.username}</div>
											)}
										</div>

										<div className="form-group dark-theme">
											<label htmlFor="email">
												Email *
												<span className="field-description dark-theme">
													(formato: ejemplo@dominio.com)
												</span>
											</label>
											<input
												type="email"
												id="email"
												name="email"
												value={formData.email}
												onChange={handleChange}
												onBlur={handleBlur}
												className={errors.email ? "error dark-theme" : "dark-theme"}
											/>
											{errors.email && (
												<div className="error-message dark-theme">{errors.email}</div>
											)}
										</div>
									</div>

									<div className="form-row dark-theme">
										<div className="form-group dark-theme">
											<label htmlFor="password">
												Contraseña *
												<span className="field-description dark-theme">
													(min. 8 caracteres, mayúsculas, minúsculas, números y símbolos)
												</span>
											</label>
											<input
												type="password"
												id="password"
												name="password"
												value={formData.password}
												onChange={handleChange}
												onBlur={handleBlur}
												className={errors.password ? "error dark-theme" : "dark-theme"}
											/>
											{errors.password && (
												<div className="error-message dark-theme">{errors.password}</div>
											)}
										</div>

										<div className="form-group dark-theme">
											<label htmlFor="confirmPassword">
												Confirmar contraseña *
												<span className="field-description dark-theme">
													(debe coincidir con la contraseña)
												</span>
											</label>
											<input
												type="password"
												id="confirmPassword"
												name="confirmPassword"
												value={formData.confirmPassword}
												onChange={handleChange}
												onBlur={handleBlur}
												className={errors.confirmPassword ? "error dark-theme" : "dark-theme"}
											/>
											{errors.confirmPassword && (
												<div className="error-message dark-theme">{errors.confirmPassword}</div>
											)}
										</div>
									</div>
								</fieldset>

								<fieldset className="form-section dark-theme">
									<legend>Información Personal</legend>

									<div className="form-row dark-theme">
										<div className="form-group dark-theme">
											<label htmlFor="phone">
												Teléfono
												<span className="field-description dark-theme">
													(9-15 dígitos, puede incluir +)
												</span>
											</label>
											<input
												type="tel"
												id="phone"
												name="phone"
												value={formData.phone}
												onChange={handleChange}
												onBlur={handleBlur}
												className={errors.phone ? "error dark-theme" : "dark-theme"}
											/>
											{errors.phone && (
												<div className="error-message dark-theme">{errors.phone}</div>
											)}
										</div>

										<div className="form-group dark-theme">
											<label htmlFor="website">
												Sitio web
												<span className="field-description dark-theme">
													(URL completa, protocolo opcional)
												</span>
											</label>
											<input
												type="url"
												id="website"
												name="website"
												value={formData.website}
												onChange={handleChange}
												onBlur={handleBlur}
												className={errors.website ? "error dark-theme" : "dark-theme"}
												placeholder="ejemplo.com"
											/>
											{errors.website && (
												<div className="error-message dark-theme">{errors.website}</div>
											)}
										</div>
									</div>

									<div className="form-row dark-theme">
										<div className="form-group dark-theme">
											<label htmlFor="age">
												Edad
												<span className="field-description dark-theme">(18-150 años)</span>
											</label>
											<input
												type="number"
												id="age"
												name="age"
												value={formData.age}
												onChange={handleChange}
												onBlur={handleBlur}
												min="18"
												max="150"
												className={errors.age ? "error dark-theme" : "dark-theme"}
											/>
											{errors.age && <div className="error-message dark-theme">{errors.age}</div>}
										</div>

										<div className="form-group dark-theme">
											<label htmlFor="postalCode">
												Código postal
												<span className="field-description dark-theme">(5 dígitos)</span>
											</label>
											<input
												type="text"
												id="postalCode"
												name="postalCode"
												value={formData.postalCode}
												onChange={handleChange}
												onBlur={handleBlur}
												className={errors.postalCode ? "error dark-theme" : "dark-theme"}
												maxLength="5"
											/>
											{errors.postalCode && (
												<div className="error-message dark-theme">{errors.postalCode}</div>
											)}
										</div>
									</div>

									<div className="form-group dark-theme">
										<label htmlFor="creditCard">
											Tarjeta de crédito
											<span className="field-description dark-theme">
												(16 dígitos, sin espacios)
											</span>
										</label>
										<input
											type="text"
											id="creditCard"
											name="creditCard"
											value={formData.creditCard}
											onChange={handleChange}
											onBlur={handleBlur}
											className={errors.creditCard ? "error dark-theme" : "dark-theme"}
											maxLength="16"
										/>
										{errors.creditCard && (
											<div className="error-message dark-theme">{errors.creditCard}</div>
										)}
									</div>

									<div className="form-group dark-theme">
										<label htmlFor="bio">
											Biografía
											<span className="field-description dark-theme">
												(máximo 500 caracteres)
											</span>
										</label>
										<textarea
											id="bio"
											name="bio"
											value={formData.bio}
											onChange={handleChange}
											onBlur={handleBlur}
											className={errors.bio ? "error dark-theme" : "dark-theme"}
											rows="4"
											maxLength="500"></textarea>
										<div className="char-counter dark-theme">
											{formData.bio.length}/500 caracteres
										</div>
										{errors.bio && <div className="error-message dark-theme">{errors.bio}</div>}
									</div>
								</fieldset>

								{errors.form && <div className="form-error dark-theme">{errors.form}</div>}

								<div className="form-actions dark-theme">
									<button
										type="submit"
										className="submit-btn dark-theme"
										disabled={isSubmitting}>
										{isSubmitting ? "Enviando..." : "Enviar formulario"}
									</button>

									<button
										type="button"
										onClick={resetForm}
										className="reset-btn dark-theme"
										disabled={isSubmitting}>
										Limpiar formulario
									</button>
								</div>
							</form>
						)}
					</div>
				</div>

				<div className="regex-section dark-theme">
					<h5>Expresiones Regulares para Validación</h5>
					<p>
						Las expresiones regulares son patrones utilizados para validar formatos específicos. Son
						especialmente útiles para validar emails, contraseñas, números de teléfono y otros formatos de
						texto estructurado.
					</p>

					<div className="regex-table dark-theme">
						<div className="regex-row header dark-theme">
							<div className="regex-cell dark-theme">Campo</div>
							<div className="regex-cell dark-theme">Expresión Regular</div>
							<div className="regex-cell dark-theme">Descripción</div>
						</div>

						<div className="regex-row dark-theme">
							<div className="regex-cell dark-theme">Email</div>
							<div className="regex-cell code dark-theme">{"/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/"}</div>
							<div className="regex-cell dark-theme">Valida el formato básico de correo electrónico</div>
						</div>

						<div className="regex-row dark-theme">
							<div className="regex-cell dark-theme">Contraseña</div>
							<div className="regex-cell code dark-theme">
								{"/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/"}
							</div>
							<div className="regex-cell dark-theme">
								Min 8 caracteres, mayúsculas, minúsculas, números y símbolos
							</div>
						</div>

						<div className="regex-row dark-theme">
							<div className="regex-cell dark-theme">Número telefónico</div>
							<div className="regex-cell code dark-theme">{"/^\\+?[0-9]{9,15}$/"}</div>
							<div className="regex-cell dark-theme">9-15 dígitos con posible '+' al inicio</div>
						</div>

						<div className="regex-row dark-theme">
							<div className="regex-cell dark-theme">URL</div>
							<div className="regex-cell code dark-theme">
								{
									"/^(https?:\\/\\/)?(www\\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/"
								}
							</div>
							<div className="regex-cell dark-theme">Válida URLs con o sin protocolo</div>
						</div>
					</div>
				</div>

				<div className="code-example dark-theme">
					<h5>Código: Ejemplo de Validación y Sanitización</h5>
					<pre className="code-snippet dark-theme">
						{`// Validación de un campo de email
const validateEmail = (email) => {
  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  
  if (!email.trim()) {
    return 'El email es obligatorio';
  }
  
  if (!regex.test(email)) {
    return 'Formato de email inválido';
  }
  
  return null; // Sin error
};

// Sanitización de datos antes de enviar
const sanitizeData = (data) => {
  // Eliminar datos sensibles
  const sanitized = { ...data };
  delete sanitized.password;
  
  // Formatear email
  sanitized.email = sanitized.email.toLowerCase().trim();
  
  // Sanitizar inputs para prevenir XSS
  if (sanitized.message) {
    sanitized.message = sanitized.message
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
  
  return sanitized;
};

// Envío de formulario
const handleSubmit = (e) => {
  e.preventDefault();
  
  // Validar todos los campos
  const errors = {};
  
  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;
  
  // Si no hay errores, procesar y enviar
  if (Object.keys(errors).length === 0) {
    const sanitizedData = sanitizeData(formData);
    
    // Enviar a servidor
    fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sanitizedData)
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));
  } else {
    setFormErrors(errors);
  }
};`}
					</pre>
				</div>
			</section>

			<div className="ejercicio-footer dark-theme">
				<h4>Conceptos clave para el examen:</h4>
				<ul className="dark-theme">
					<li>
						Existen tres estrategias principales de validación: onChange (tiempo real), onBlur (al perder
						foco) y onSubmit (al enviar)
					</li>
					<li>Las expresiones regulares son herramientas poderosas para validar formatos específicos</li>
					<li>
						Es importante sanitizar los datos antes de procesarlos para prevenir vulnerabilidades como XSS
					</li>
					<li>
						La validación del lado del cliente mejora la experiencia de usuario, pero siempre debe
						complementarse con validación del lado del servidor
					</li>
					<li>
						Los datos sensibles como contraseñas nunca deben almacenarse en texto plano ni enviarse
						innecesariamente
					</li>
					<li>Durante la validación, es importante proporcionar mensajes de error claros y específicos</li>
					<li>
						Para campos complejos como tarjetas de crédito, es recomendable implementar validaciones más
						allá del formato (como algoritmo de Luhn)
					</li>
					<li>
						React permite implementar fácilmente diferentes estrategias de validación mediante hooks de
						estado
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej05_Validacion_Formularios;
