import pool from "../config/DB.js";

const User = {

    // for create new user

     async createNewUser(user_name , email , password  , id) {
          
      const values = [user_name, email, password, id];
      const sqlQuery =  'INSERT INTO Users (user_name, email, password, role_id) VALUES (?, ?, ?, ?)' 
       console.log('SQL bind values:', values);

       const [result] = await pool.execute(sqlQuery, values);
           
       console.log("final created user result:✅", result );

         return result;  
     } ,

  // for get all users

  async getAllUsers() {
    const [rows] = await pool.execute('SELECT * FROM Users');
    return rows;
  },
   

  //find user by email
   async userFindByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT * FROM Users INNER JOIN Roles ON Users.role_id = Roles.role_id WHERE email = ?',
      [email]
    );
    return rows[0] || null;
  },

// find user by id

 async userFindById (id)  {
    
        const [rows] = await pool.query(
            'SELECT * FROM Users INNER JOIN Roles ON Users.role_id = Roles.role_id WHERE user_id = ?',
            [id]
        );

        console.log("users🔴🔴🔴 :::" , rows[0]);

        return rows[0] || null;
},

}
export default User;