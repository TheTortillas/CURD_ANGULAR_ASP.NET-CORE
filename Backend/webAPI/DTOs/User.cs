namespace webAPI.dto
{
    public class User
    {
        public string email { get; set; } = String.Empty;
        public string password { get; set; } = String.Empty;
        public string name { get; set; } = String.Empty;
        public string last_name { get; set; } = String.Empty;
        public string second_last_name { get; set; } = String.Empty;
        public DateTime birth_date { get; set; } = DateTime.Now;
        public string phone_number { get; set; } = "SIN TELEFONO";

    }
}
