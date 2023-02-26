import { useForm } from 'react-hook-form';

type InputField = {
	label: string;
	type: string;
	id: string;
	name: string;
	required: boolean;
};

type ModalInputsProps = {
	inputFields: InputField[];
	isOpen: boolean;
	onSend: any;
	onClose: () => void;
};

export const ModalInputs = ({ inputFields, onSend, onClose, isOpen }: ModalInputsProps) => {
	const { register, handleSubmit } = useForm({});

	return (
		<div className="modal-input" style={{ display: isOpen ? 'flex' : ' none' }}>
			<div className="modal-header">
				<h1>Input Modal</h1>
				<button className="close-modal" onClick={onClose}>
					X
				</button>
			</div>

			<form onSubmit={handleSubmit(onSend)}>
				{inputFields.map(inputField => (
					<div key={inputField.id + '-input'} className="input-field">
						<label htmlFor={inputField.name}>{inputField.label}</label>
						<input
							{...register(inputField.id, { required: inputField.required })}
							type={inputField.type}
							id={inputField.id}
							name={inputField.name}
							step={inputField.type === 'number' ? '0.01' : undefined}
						/>
					</div>
				))}

				<div className="form-actions">
					<button className="cancel" onClick={onClose}>
						Cancelar
					</button>
					<button className="send" type="submit">
						Enviar
					</button>
				</div>
			</form>
		</div>
	);
};
