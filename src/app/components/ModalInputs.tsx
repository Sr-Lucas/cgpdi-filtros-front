import { FieldValues, UseFormRegister } from 'react-hook-form';

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
	register: UseFormRegister<FieldValues>;
};

export const ModalInputs = ({ inputFields, onSend, onClose, isOpen, register }: ModalInputsProps) => {
	return (
		<div className="modal-input" style={{ display: isOpen ? 'flex' : ' none' }}>
			<div className="modal-header">
				<h1>Input Modal</h1>
				<button className="close-modal" onClick={onClose}>
					X
				</button>
			</div>

			<form onSubmit={onSend}>
				{inputFields.map(inputField => (
					<div key={inputField.id} className="input-field">
						<label htmlFor={inputField.name}>{inputField.label}</label>
						<input
							{...register(inputField.id, { required: inputField.required })}
							type={inputField.type}
							id={inputField.id}
							name={inputField.name}
						/>
					</div>
				))}

				<div className="form-actions">
					<button className="cancel" onClick={onClose}>
						Cancelar
					</button>
					<button className="send" onClick={onSend}>
						Enviar
					</button>
				</div>
			</form>
		</div>
	);
};
