using MySql.Data;
using MySql.Data.MySqlClient;
using MySqlX.XDevAPI.Common;

namespace webAPI
{
    public class DBManager
    {
        private readonly IConfiguration _config;
        // Constructor
        public DBManager(IConfiguration config)
        {
            _config = config;
        }

        // Crear un nuevo usuario
        public int sign_up(string p_email, string p_password, string p_first_name, string p_last_name, string p_second_last_name, DateTime p_birth_date, string p_phone_number)
        {
            int result = -1;
            try
            {
                using (MySqlConnection con = new MySqlConnection(_config.GetConnectionString("default")))
                {
                    MySqlCommand mySqlCommand = new MySqlCommand("insert_user", con);
                    mySqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    mySqlCommand.Parameters.Add(new MySqlParameter("p_email", p_email));
                    mySqlCommand.Parameters.Add(new MySqlParameter("p_password", p_password));
                    mySqlCommand.Parameters.Add(new MySqlParameter("p_first_name", p_first_name));
                    mySqlCommand.Parameters.Add(new MySqlParameter("p_last_name", p_last_name));
                    mySqlCommand.Parameters.Add(new MySqlParameter("p_second_last_name", p_second_last_name));
                    mySqlCommand.Parameters.Add(new MySqlParameter("p_birth_date", p_birth_date.ToString("yyyy/MM/dd")));
                    mySqlCommand.Parameters.Add(new MySqlParameter("p_phone_number", p_phone_number));
                    con.Open();
                    mySqlCommand.ExecuteNonQuery();

                    if (con.State == System.Data.ConnectionState.Open)
                    {
                        con.Close();
                        result = 1;
                    }
                }
            }
            catch (Exception ex) {
                Console.WriteLine($"Error: {ex.Message}");
                result = 999;
            }
            return result;
        }

        // Iniciar sesión
        public bool sign_in(string p_email, string p_password)
        {
            bool isValid = false;
            try
            {
                using (MySqlConnection con = new MySqlConnection(_config.GetConnectionString("default")))
                {
                    // Crear el comando para ejecutar el procedimiento almacenado
                    MySqlCommand mySqlCommand = new MySqlCommand("verify_user", con);
                    mySqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                    // Parámetros de entrada
                    mySqlCommand.Parameters.Add(new MySqlParameter("p_email", p_email));
                    mySqlCommand.Parameters.Add(new MySqlParameter("p_password", p_password));

                    // Parámetro de salida para indicar si el usuario es válido o no
                    MySqlParameter isValidParam = new MySqlParameter("p_is_valid", MySqlDbType.Bit);
                    isValidParam.Direction = System.Data.ParameterDirection.Output;
                    mySqlCommand.Parameters.Add(isValidParam);

                    // Ejecutar el comando
                    con.Open();
                    mySqlCommand.ExecuteNonQuery();

                    if (con.State == System.Data.ConnectionState.Open)
                    {
                        con.Close();
                        // Obtener el valor del parámetro de salida
                        isValid = Convert.ToBoolean(isValidParam.Value);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                isValid = false;
            }
            return isValid;
        }

        // Borrar un usuario
        public bool delete_user(string p_email)
        {
            bool result = false;
            try
            {
                using (MySqlConnection con = new MySqlConnection(_config.GetConnectionString("default")))
                {
                    MySqlCommand mySqlCommand = new MySqlCommand("delete_user_by_email", con);
                    mySqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    mySqlCommand.Parameters.Add(new MySqlParameter("p_email", p_email));

                    MySqlParameter resultParam = new MySqlParameter("p_is_deleted", MySqlDbType.Bit);
                    resultParam.Direction = System.Data.ParameterDirection.Output;
                    mySqlCommand.Parameters.Add(resultParam);

                    con.Open();
                    mySqlCommand.ExecuteNonQuery();

                    if (con.State == System.Data.ConnectionState.Open)
                    {
                        con.Close();
                        result = true;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                result = false;
            }
            return result;
        }
    }
}
