using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
namespace CAFE.Backend.Utility
{

    public static class IdentifierGenerator
    {
        private static readonly Random _random = new Random();

        public static string GenerateUniqueIdentifier()
        {
            const string prefix = "UI";
            const int length = 7;
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

            string identifier;
            do
            {
                identifier = prefix + new string(Enumerable.Repeat(chars, length)
                    .Select(s => s[_random.Next(s.Length)]).ToArray());
            } while (!IsValidIdentifier(identifier));

            return identifier;
        }

        private static bool IsValidIdentifier(string identifier)
        {
            // Add your validation logic here if needed
            return true;
        }
    }
}
