// import { validate } from 'uuid';
// import { assertIsValid } from '../../../utils/validator';
// import { UpdateUserParam, UpdateUserSchema } from '../schema';
// import { AppError } from '../../../shared/errors/AppError';
// import { UserRepository } from '../../repository/user';
// import { hashPassword } from '../../../utils/password';
// import { postgresClient } from '../../../infrastructure/postgres/connection';

// export const update = async (userId: string, updateParams: UpdateUserParam) => {
//   if (!validate(userId)) throw new AppError('INVALID_ARGUMENT', 'Invalid user ID');
//   assertIsValid(UpdateUserSchema, { ...updateParams });

//   const user = await UserRepository.findUnique({ id: userId }, postgresClient);
//   if (!user) throw new AppError('NOT_FOUND', 'User not found.');

//   if (Object.keys(updateParams).length) {
//     const data = {
//       first_name: updateParams.firstName,
//       last_name: updateParams.lastName,
//       email: updateParams.email,
//       password: updateParams.password
//     };

//     await UserRepository.update(
//       { id: userId },
//       { ...data, ...(data.password && { password: await hashPassword(data.password) }) },
//       postgresClient
//     );
//   }
// };
