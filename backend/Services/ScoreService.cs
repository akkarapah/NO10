using System.Text.Json;
using Microsoft.AspNetCore.Hosting;
using MockupApi.Models;

namespace MockupApi.Services
{
    public class ScoreService
    {
        private readonly string _filePath;
        private readonly object _lock = new object();
        
        public ScoreService(IWebHostEnvironment env)
        {
            _filePath = Path.Combine(env.ContentRootPath, "scores.json");
            
            // Create the file if it doesn't exist
            if (!File.Exists(_filePath))
            {
                File.WriteAllText(_filePath, "[]");
            }
        }
        
        public List<Score> GetScores()
        {
            lock (_lock)
            {
                var json = File.ReadAllText(_filePath);
                var options = new JsonSerializerOptions 
                { 
                    PropertyNameCaseInsensitive = true 
                };
                return JsonSerializer.Deserialize<List<Score>>(json, options) ?? new List<Score>();
            }
        }
        
        public Score AddScore(string name, int score, int maxScore)
        {
            lock (_lock)
            {
                var scores = GetScores();
                
                var newScore = new Score
                {
                    Id = scores.Count > 0 ? scores.Max(s => s.Id) + 1 : 1,
                    Name = name,
                    TotalScore = score,
                    MaxScore = maxScore,
                    Date = DateTime.Now
                };
                
                scores.Add(newScore);
                
                var options = new JsonSerializerOptions
                {
                    WriteIndented = true
                };
                
                File.WriteAllText(_filePath, JsonSerializer.Serialize(scores, options));
                
                return newScore;
            }
        }
        
        public void ClearScores()
        {
            lock (_lock)
            {
                File.WriteAllText(_filePath, "[]");
            }
        }
    }
}
