import { compare, genSalt, hash } from 'bcrypt';

export function hashPassword(rawPassword): Promise<void> {
    return new Promise((resolve, reject) => {
        genSalt(11, (err, salt) => {
            if (err) reject(err);
            hash(rawPassword, salt, (err, hash) => {
                if (err) reject(err);
                resolve(hash);
            });
        });
    });
}

export function comparePassword(rawPassword, hashword): Promise<void> {
    return new Promise((resolve, reject) => {
        compare(rawPassword, hashword, (err, isPasswordMatch) => {
            if (err) reject(err);
            resolve(isPasswordMatch);
        });
    });
}
