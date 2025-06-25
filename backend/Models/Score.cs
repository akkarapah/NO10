using System.Text.Json.Serialization;

namespace MockupApi.Models
{
    public class Score
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;

        [JsonPropertyName("score")]
        public int TotalScore { get; set; }
        
        [JsonPropertyName("maxScore")]
        public int MaxScore { get; set; }
        
        [JsonPropertyName("date")]
        public DateTime Date { get; set; }
    }
}
