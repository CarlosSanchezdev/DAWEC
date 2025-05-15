/**
 * @fileoverview Ejercicio sobre Formularios Avanzados en React
 * @ejercicio Ej04_Formularios_Avanzados
 * @tema Tema 7: Interacción con el usuario, eventos y formularios
 * @fecha 11/05/2025
 */

import { useState, useRef } from "react";
import "./Ej04_Formularios_Avanzados.css";

/**
 * @function Ej04_Formularios_Avanzados
 * @description Componente que demuestra características avanzadas de formularios en React
 * @returns {JSX.Element} Componente con ejemplos de formularios avanzados
 */
function Ej04_Formularios_Avanzados() {
	// ===== HOOKS =====
	// Estado para formulario controlado
	const [controlledForm, setControlledForm] = useState({
		fullName: "",
		email: "",
		color: "#6272a4",
		range: 50,
		date: "",
		file: null,
	});

	// Referencias para formulario no controlado
	const uncontrolledFormRef = useRef(null);
	const fullNameRef = useRef(null);
	const emailRef = useRef(null);
	const colorRef = useRef(null);
	const rangeRef = useRef(null);
	const dateRef = useRef(null);
	const fileRef = useRef(null);

	// Estado para mostrar resultados
	const [controlledResult, setControlledResult] = useState(null);
	const [uncontrolledResult, setUncontrolledResult] = useState(null);

	// Estado para previsualización de archivo
	const [filePreview, setFilePreview] = useState(null);

	// Estado para errores de validación
	const [controlledErrors, setControlledErrors] = useState({});

	// ===== FUNCIONES AUXILIARES =====
	/**
	 * @function handleControlledChange
	 * @description Maneja cambios en formulario controlado
	 * @param {React.ChangeEvent} e - Evento de cambio
	 */
	const handleControlledChange = (e) => {
		const { name, value, type, files } = e.target;

		if (type === "file") {
			// Manejo especial para campos de archivo
			const file = files[0];
			setControlledForm({
				...controlledForm,
				[name]: file,
			});

			// Crear URL para previsualización
			if (file && file.type.startsWith("image/")) {
				const reader = new FileReader();
				reader.onload = (event) => {
					setFilePreview(event.target.result);
				};
				reader.readAsDataURL(file);
			} else {
				setFilePreview(null);
			}
		} else {
			// Manejo normal para otros campos
			setControlledForm({
				...controlledForm,
				[name]: value,
			});
		}

		// Limpiar error si el campo se está editando
		if (controlledErrors[name]) {
			setControlledErrors({
				...controlledErrors,
				[name]: null,
			});
		}
	};

	/**
	 * @function validateControlledForm
	 * @description Valida el formulario controlado
	 * @returns {boolean} True si el formulario es válido
	 */
	const validateControlledForm = () => {
		const errors = {};

		if (!controlledForm.fullName.trim()) {
			errors.fullName = "El nombre completo es obligatorio";
		}

		if (!controlledForm.email.trim()) {
			errors.email = "El email es obligatorio";
		} else if (!/\S+@\S+\.\S+/.test(controlledForm.email)) {
			errors.email = "El formato del email no es válido";
		}

		if (!controlledForm.date) {
			errors.date = "La fecha es obligatoria";
		}

		setControlledErrors(errors);
		return Object.keys(errors).length === 0;
	};

	/**
	 * @function handleControlledSubmit
	 * @description Maneja el envío del formulario controlado
	 * @param {React.FormEvent} e - Evento de envío
	 */
	const handleControlledSubmit = (e) => {
		e.preventDefault();

		if (validateControlledForm()) {
			// Si es válido, mostrar resultado
			setControlledResult({
				...controlledForm,
				fileDetails: controlledForm.file
					? {
							name: controlledForm.file.name,
							type: controlledForm.file.type,
							size: `${(controlledForm.file.size / 1024).toFixed(2)} KB`,
					  }
					: null,
			});

			console.log("Formulario controlado enviado:", controlledForm);
		}
	};

	/**
	 * @function handleUncontrolledSubmit
	 * @description Maneja el envío del formulario no controlado
	 * @param {React.FormEvent} e - Evento de envío
	 */
	const handleUncontrolledSubmit = (e) => {
		e.preventDefault();

		// Obtener valores directamente de las referencias DOM
		const formData = {
			fullName: fullNameRef.current.value,
			email: emailRef.current.value,
			color: colorRef.current.value,
			range: rangeRef.current.value,
			date: dateRef.current.value,
			file: fileRef.current.files[0],
		};

		setUncontrolledResult({
			...formData,
			fileDetails: formData.file
				? {
						name: formData.file.name,
						type: formData.file.type,
						size: `${(formData.file.size / 1024).toFixed(2)} KB`,
				  }
				: null,
		});

		console.log("Formulario no controlado enviado:", formData);
	};

	/**
	 * @function resetForms
	 * @description Restablece ambos formularios
	 */
	const resetForms = () => {
		// Restablecer formulario controlado
		setControlledForm({
			fullName: "",
			email: "",
			color: "#6272a4",
			range: 50,
			date: "",
			file: null,
		});
		setControlledErrors({});
		setControlledResult(null);
		setFilePreview(null);

		// Restablecer formulario no controlado
		if (uncontrolledFormRef.current) {
			uncontrolledFormRef.current.reset();
		}
		setUncontrolledResult(null);
	};

	// ===== RENDER =====
	return (
		<div className="ejercicio-content dark-theme">
			<section className="concepto-section dark-theme">
				<h4>7.4 Formularios Avanzados</h4>
				<p>
					Los formularios en React pueden implementarse de dos maneras principales: controlados o no
					controlados. Los formularios controlados tienen su estado manejado por React, mientras que los no
					controlados utilizan referencias al DOM para acceder a los valores de los campos.
				</p>

				<div className="comparison-container dark-theme">
					<div className="form-column dark-theme">
						<h5>Formulario Controlado</h5>
						<p className="form-description dark-theme">
							React mantiene y actualiza el estado interno, facilitando la validación en tiempo real, el
							formateo de datos y el acceso a los valores en cualquier momento.
						</p>

						<form
							className="advanced-form dark-theme"
							onSubmit={handleControlledSubmit}>
							<div className="form-group dark-theme">
								<label htmlFor="controlled-name">Nombre completo</label>
								<input
									type="text"
									id="controlled-name"
									name="fullName"
									value={controlledForm.fullName}
									onChange={handleControlledChange}
									className={controlledErrors.fullName ? "error dark-theme" : "dark-theme"}
									placeholder="Escribe tu nombre completo"
								/>
								{controlledErrors.fullName && (
									<div className="error-message dark-theme">{controlledErrors.fullName}</div>
								)}
							</div>

							<div className="form-group dark-theme">
								<label htmlFor="controlled-email">Email</label>
								<input
									type="email"
									id="controlled-email"
									name="email"
									value={controlledForm.email}
									onChange={handleControlledChange}
									className={controlledErrors.email ? "error dark-theme" : "dark-theme"}
									placeholder="ejemplo@correo.com"
								/>
								{controlledErrors.email && (
									<div className="error-message dark-theme">{controlledErrors.email}</div>
								)}
							</div>

							<div className="form-row dark-theme">
								<div className="form-group dark-theme">
									<label htmlFor="controlled-color">Color favorito</label>
									<div className="color-picker-container dark-theme">
										<input
											type="color"
											id="controlled-color"
											name="color"
											value={controlledForm.color}
											onChange={handleControlledChange}
											className="dark-theme"
										/>
										<span className="color-value dark-theme">{controlledForm.color}</span>
									</div>
								</div>

								<div className="form-group dark-theme">
									<label htmlFor="controlled-range">Satisfacción (0-100)</label>
									<div className="range-container dark-theme">
										<input
											type="range"
											id="controlled-range"
											name="range"
											min="0"
											max="100"
											value={controlledForm.range}
											onChange={handleControlledChange}
											className="dark-theme"
										/>
										<span className="range-value dark-theme">{controlledForm.range}%</span>
									</div>
								</div>
							</div>

							<div className="form-group dark-theme">
								<label htmlFor="controlled-date">Fecha de nacimiento</label>
								<input
									type="date"
									id="controlled-date"
									name="date"
									value={controlledForm.date}
									onChange={handleControlledChange}
									className={controlledErrors.date ? "error dark-theme" : "dark-theme"}
								/>
								{controlledErrors.date && (
									<div className="error-message dark-theme">{controlledErrors.date}</div>
								)}
							</div>

							<div className="form-group dark-theme">
								<label htmlFor="controlled-file">Foto de perfil</label>
								<input
									type="file"
									id="controlled-file"
									name="file"
									onChange={handleControlledChange}
									className="dark-theme"
									accept="image/*"
								/>
								<div className="file-help dark-theme">Formatos: JPG, PNG, GIF (max 2MB)</div>

								{filePreview && (
									<div className="file-preview dark-theme">
										<h6>Previsualización:</h6>
										<img
											src={filePreview}
											alt="Vista previa"
											className="preview-image dark-theme"
										/>
									</div>
								)}
							</div>

							<div className="form-actions dark-theme">
								<button
									type="submit"
									className="submit-btn dark-theme">
									Enviar formulario
								</button>
							</div>
						</form>

						{controlledResult && (
							<div className="form-result dark-theme">
								<h6>Resultado:</h6>
								<div className="result-content dark-theme">
									<p>
										<strong>Nombre:</strong> {controlledResult.fullName}
									</p>
									<p>
										<strong>Email:</strong> {controlledResult.email}
									</p>
									<p>
										<strong>Color:</strong>{" "}
										<span style={{ color: controlledResult.color }}>{controlledResult.color}</span>
									</p>
									<p>
										<strong>Satisfacción:</strong> {controlledResult.range}%
									</p>
									<p>
										<strong>Fecha:</strong> {controlledResult.date}
									</p>
									{controlledResult.fileDetails && (
										<div className="file-details dark-theme">
											<p>
												<strong>Archivo:</strong> {controlledResult.fileDetails.name}
											</p>
											<p>
												<strong>Tipo:</strong> {controlledResult.fileDetails.type}
											</p>
											<p>
												<strong>Tamaño:</strong> {controlledResult.fileDetails.size}
											</p>
										</div>
									)}
								</div>
							</div>
						)}
					</div>

					<div className="form-column dark-theme">
						<h5>Formulario No Controlado</h5>
						<p className="form-description dark-theme">
							El DOM maneja el estado de los campos. Es más simple para formularios sencillos o cuando se
							integra con bibliotecas de terceros.
						</p>

						<form
							className="advanced-form dark-theme"
							onSubmit={handleUncontrolledSubmit}
							ref={uncontrolledFormRef}>
							<div className="form-group dark-theme">
								<label htmlFor="uncontrolled-name">Nombre completo</label>
								<input
									type="text"
									id="uncontrolled-name"
									name="fullName"
									ref={fullNameRef}
									className="dark-theme"
									placeholder="Escribe tu nombre completo"
									defaultValue=""
								/>
							</div>

							<div className="form-group dark-theme">
								<label htmlFor="uncontrolled-email">Email</label>
								<input
									type="email"
									id="uncontrolled-email"
									name="email"
									ref={emailRef}
									className="dark-theme"
									placeholder="ejemplo@correo.com"
									defaultValue=""
								/>
							</div>

							<div className="form-row dark-theme">
								<div className="form-group dark-theme">
									<label htmlFor="uncontrolled-color">Color favorito</label>
									<div className="color-picker-container dark-theme">
										<input
											type="color"
											id="uncontrolled-color"
											name="color"
											ref={colorRef}
											className="dark-theme"
											defaultValue="#bd93f9"
										/>
									</div>
								</div>

								<div className="form-group dark-theme">
									<label htmlFor="uncontrolled-range">Satisfacción (0-100)</label>
									<div className="range-container dark-theme">
										<input
											type="range"
											id="uncontrolled-range"
											name="range"
											min="0"
											max="100"
											ref={rangeRef}
											className="dark-theme"
											defaultValue="50"
										/>
									</div>
								</div>
							</div>

							<div className="form-group dark-theme">
								<label htmlFor="uncontrolled-date">Fecha de nacimiento</label>
								<input
									type="date"
									id="uncontrolled-date"
									name="date"
									ref={dateRef}
									className="dark-theme"
									defaultValue=""
								/>
							</div>

							<div className="form-group dark-theme">
								<label htmlFor="uncontrolled-file">Foto de perfil</label>
								<input
									type="file"
									id="uncontrolled-file"
									name="file"
									ref={fileRef}
									className="dark-theme"
									accept="image/*"
								/>
								<div className="file-help dark-theme">Formatos: JPG, PNG, GIF (max 2MB)</div>
							</div>

							<div className="form-actions dark-theme">
								<button
									type="submit"
									className="submit-btn dark-theme">
									Enviar formulario
								</button>
							</div>
						</form>

						{uncontrolledResult && (
							<div className="form-result dark-theme">
								<h6>Resultado:</h6>
								<div className="result-content dark-theme">
									<p>
										<strong>Nombre:</strong> {uncontrolledResult.fullName}
									</p>
									<p>
										<strong>Email:</strong> {uncontrolledResult.email}
									</p>
									<p>
										<strong>Color:</strong>{" "}
										<span style={{ color: uncontrolledResult.color }}>
											{uncontrolledResult.color}
										</span>
									</p>
									<p>
										<strong>Satisfacción:</strong> {uncontrolledResult.range}%
									</p>
									<p>
										<strong>Fecha:</strong> {uncontrolledResult.date}
									</p>
									{uncontrolledResult.fileDetails && (
										<div className="file-details dark-theme">
											<p>
												<strong>Archivo:</strong> {uncontrolledResult.fileDetails.name}
											</p>
											<p>
												<strong>Tipo:</strong> {uncontrolledResult.fileDetails.type}
											</p>
											<p>
												<strong>Tamaño:</strong> {uncontrolledResult.fileDetails.size}
											</p>
										</div>
									)}
								</div>
							</div>
						)}
					</div>
				</div>

				<div className="form-reset-section dark-theme">
					<button
						onClick={resetForms}
						className="reset-all-btn dark-theme">
						Restablecer todos los formularios
					</button>
				</div>

				<div className="code-example dark-theme">
					<h5>Comparación de Código: Controlado vs No Controlado</h5>
					<div className="code-comparison dark-theme">
						<div className="code-column dark-theme">
							<h6>Formulario Controlado</h6>
							<pre className="code-snippet dark-theme">
								{`// Estado para campos del formulario
const [formData, setFormData] = useState({
  name: '',
  email: ''
});

// Manejador de cambios
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value
  });
};

// Manejador de envío
const handleSubmit = (e) => {
  e.preventDefault();
  console.log('Datos:', formData);
};

// JSX del formulario
<form onSubmit={handleSubmit}>
  <input
    name="name"
    value={formData.name}
    onChange={handleChange}
  />
  <input
    name="email"
    value={formData.email}
    onChange={handleChange}
  />
  <button type="submit">Enviar</button>
</form>`}
							</pre>
						</div>

						<div className="code-column dark-theme">
							<h6>Formulario No Controlado</h6>
							<pre className="code-snippet dark-theme">
								{`// Referencias para acceder al DOM
const nameRef = useRef(null);
const emailRef = useRef(null);
const formRef = useRef(null);

// Manejador de envío
const handleSubmit = (e) => {
  e.preventDefault();
  const data = {
    name: nameRef.current.value,
    email: emailRef.current.value
  };
  console.log('Datos:', data);
};

// Para resetear el formulario
const resetForm = () => {
  formRef.current.reset();
};

// JSX del formulario
<form onSubmit={handleSubmit} ref={formRef}>
  <input
    name="name"
    ref={nameRef}
    defaultValue=""
  />
  <input
    name="email"
    ref={emailRef}
    defaultValue=""
  />
  <button type="submit">Enviar</button>
</form>`}
							</pre>
						</div>
					</div>
				</div>

				<div className="file-input-section dark-theme">
					<h5>Campos especiales: Archivos y modificación de apariencia</h5>
					<p>
						Los campos de tipo archivo requieren un manejo especial ya que no pueden ser controlados
						directamente debido a restricciones de seguridad. Para estos campos, es necesario utilizar el
						objeto FileReader para procesar la información del archivo seleccionado.
					</p>

					<pre className="code-snippet dark-theme">
						{`// Manejo de archivos
const handleFileChange = (e) => {
  const file = e.target.files[0];
  
  if (file) {
    // Para obtener información del archivo
    console.log('Nombre:', file.name);
    console.log('Tipo:', file.type);
    console.log('Tamaño:', file.size, 'bytes');
    
    // Para previsualizar una imagen
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  }
};

// Estilización de inputs
const CustomFileInput = () => {
  const [fileName, setFileName] = useState('Ningún archivo seleccionado');
  
  const handleChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : 'Ningún archivo seleccionado');
  };
  
  return (
    <div className="custom-file-input">
      <input
        type="file"
        id="file"
        onChange={handleChange}
        style={{ display: 'none' }}
      />
      <label htmlFor="file" className="file-button">
        Seleccionar archivo
      </label>
      <span className="file-name">{fileName}</span>
    </div>
  );
};`}
					</pre>
				</div>
			</section>

			<div className="ejercicio-footer dark-theme">
				<h4>Conceptos clave para el examen:</h4>
				<ul className="dark-theme">
					<li>Formularios controlados: el estado se maneja con React (mediante useState)</li>
					<li>Formularios no controlados: el DOM maneja el estado (mediante useRef)</li>
					<li>En formularios controlados usar value + onChange; en no controlados usar defaultValue + ref</li>
					<li>Los campos de tipo file son siempre no controlados por seguridad</li>
					<li>FileReader permite trabajar con el contenido de archivos seleccionados</li>
					<li>Los campos controlados permiten validación en tiempo real y formateo de datos</li>
					<li>
						Los campos no controlados son más simples y pueden ser más eficientes para formularios grandes
					</li>
					<li>Se pueden personalizar la apariencia de los inputs usando CSS y componentes personalizados</li>
				</ul>
			</div>
		</div>
	);
}

export default Ej04_Formularios_Avanzados;
