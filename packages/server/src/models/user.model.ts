import pool from "../config/db";

// NOTE: Why aways get parameters to use ? 
// why using $1, $2, $3 ? 
// why using [name, email, hashedPassword]

export const createUser = async ( name: string, email: string, hashedPassword: string ) => {
    const reuslt = await pool.query(
        // write SQL code that take name, email, hashedPassword
        // insert them into users of name, email, password
        // value $1 (name, name) $2 (email, email)...
        // return return id, name, email, role
        `INSERT INTO users (name, email, password)
         VALUES ($1, $2, $3)
         RETURNING id, name, email, role`,
         [name, email, hashedPassword]
    );

    // after inserting return it back, the first role
    return reuslt.rows[0];
};

export const updateUser = async ( id: number, name: string, email: string, role: string) => {
  const result = await pool.query(
    `UPDATE users SET name = $1, email = $2, role = $3
     WHERE id = $4
     RETURNING id, name, email, role
    `,
    [name, email, role, id]
  );

  return result.rows[0];
};

export const getUsers = async () => {
    const result = await pool.query(
        `SELECT * FROM users
         ORDER BY id DESC
        `
    )

    return result.rows;
}

export const getUserById = async (id: number) => {
    const result = await pool.query (
        `SELECT * FROM users WHERE id = $1`,
        [id]
    )

    return result.rows[0];
}

export const deleteUser = async (id: number) => {
    const result = await pool.query (
        `DELETE FROM users
         WHERE id = $1
         RETURNING *`,
        [id]
    )

    return result.rows[0];
}

// we need findUserByEmail because we must make sure user is not existed
export const findUserByEmail = async (email: string) => {
    const reuslt = await pool.query (
        // select everything from user where email ($1) = email (param)
        `SELECT * FROM users WHERE email = $1`,
        [email]
    );

    return reuslt.rows[0];
};