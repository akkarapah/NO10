using System.Text.Json;
using Microsoft.AspNetCore.Hosting;
using MockupApi.Models;

namespace MockupApi.Services
{    public class QuestionService
    {
        private readonly string _filePath;
        
        public QuestionService(IWebHostEnvironment env)
        {
            _filePath = Path.Combine(env.ContentRootPath, "questions.json");
        }        public List<Question> GetQuestions()
        {
            var json = File.ReadAllText(_filePath);
            var options = new JsonSerializerOptions 
            { 
                PropertyNameCaseInsensitive = true 
            };
            return JsonSerializer.Deserialize<List<Question>>(json, options) ?? new List<Question>();
        }

        public Question? GetQuestion(int id) => GetQuestions().FirstOrDefault(q => q.Id == id);
    }
}
