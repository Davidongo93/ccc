import { forwardRef, useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: boolean;
	helperText?: string;
}

export const StyledInput = forwardRef<HTMLInputElement, InputProps>(
	({ label, error, helperText, className = '', id, required, onInvalid, ...props }, ref) => {
		const [touched, setTouched] = useState(false);
		const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
		
		const handleInvalid = (e: React.InvalidEvent<HTMLInputElement>) => {
			e.preventDefault();
			setTouched(true);
		};

		return (
			<div className="w-full">
				{label && (
					<label 
						htmlFor={inputId}
						className="mb-1 block text-sm font-medium text-gray-700 transition-colors duration-200"
					>
						{label} {required && <span className="text-red-500">*</span>}
					</label>
				)}
				<div className="relative">
					<input
						id={inputId}
						ref={ref}
						className={`w-full rounded-md border bg-white px-4 py-2 text-gray-900 transition-all duration-200 
							${error ? 'border-red-500' : 'border-gray-300'}
							hover:translate-y-[-1px] hover:border-[#2f450d] hover:border-2 hover:shadow-[0_2px_8px_rgba(47,69,13,0.1)]
							focus:translate-y-[-1px] focus:border-[#2f450d] focus:border-2 focus:shadow-[0_4px_12px_rgba(47,69,13,0.15)] focus:outline-none
							${className}`}
						onInvalid={handleInvalid}
						{...props}
					/>
					{touched && required && !props.value && (
						<div className="absolute left-0 -bottom-6 text-sm text-red-500 bg-white px-1 rounded">
							Este campo es obligatorio
						</div>
					)}
				</div>
				{helperText && (
					<p className={`mt-1 text-sm ${error ? 'text-red-500' : 'text-gray-500'}`}>
						{helperText}
					</p>
				)}
			</div>
		);
	}
);

StyledInput.displayName = 'StyledInput'; 