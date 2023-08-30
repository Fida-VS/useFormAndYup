import styles from './App.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const fieldsScheme = yup.object().shape({
	email: yup
		.string()
		.matches(
			/^[\w_.@]*$/,
			'Неверный адрес почты. Допустимые символы - буквы, цифры, нижнее подчёркивание, точка и @',
		)
		.max(30, 'Неверный адрес почты. Должно быть не больше 30 символов')
		.min(3, 'Неверный адрес почты. Должно быть не меньше 3 символов'),
	password: yup
		.string()
		.matches(
			/^[\wW_#.]*$/,
			'Неверный пароль. Допустимые символы - строчные буквы, прописные буквы,  цифры, нижнее подчёркивание, решётка, точка.',
		)
		.max(20, 'Неверный пароль. Должно быть не больше 20 символов')
		.min(3, 'Неверный пароль. Должно быть не меньше 3 символов'),
	repeatedPassword: yup.string().oneOf([yup.ref('password')], 'Пароли не совпадают'),
});

export const App = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			repeatedPassword: '',
		},
		resolver: yupResolver(fieldsScheme),
	});

	const emailError = errors.email?.message;
	const passwordError = errors.password?.message;
	const repeatedPasswordError = errors.repeatedPassword?.message;

	const onSubmit = (formData) => {
		console.log(formData);
	};

	return (
		<div className={styles.app}>
			<form onSubmit={handleSubmit(onSubmit)}>
				{emailError && <div className={styles.errorLabel}>{emailError}</div>}
				{passwordError && (
					<div className={styles.errorLabel}>{passwordError}</div>
				)}
				{repeatedPasswordError && (
					<div className={styles.errorLabel}>{repeatedPasswordError}</div>
				)}
				<label>Почта:</label>
				<input name="email" type="text" {...register('email')} />
				<label>Пароль:</label>
				<input name="password" type="password" {...register('password')} />
				<label>Повторный ввод пароля:</label>
				<input
					name="repeatedPassword"
					type="password"
					{...register('repeatedPassword')}
				/>
				<button
					type="submit"
					className={styles.buttonSubmit}
					disabled={emailError || passwordError || repeatedPasswordError}
				>
					Отправить
				</button>
			</form>
		</div>
	);
};
