using System.Text.Json.Serialization;

namespace MockupApi.Models
{
    public class Question
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        
        [JsonPropertyName("question")]
        public string QuestionText { get; set; } = string.Empty;
        
        [JsonPropertyName("options")]
        public List<int> Options { get; set; } = new();
        
        [JsonPropertyName("answer")]
        public int Answer { get; set; }
    }
}
