
export default  [
  {
    id: 1,
    name: "Code Explain",
   desc:"Instant Insights: By inputting your code, the AI generates clear, concise explanations to improve learning and debugging efficiency.",
   btn_name:'Explain',
   repoApi:":8002/explain_repo_code",
   textApi:":8001/explain-code",
   params:{
    "code": "string"
  },
   zipApi:":8000/explain-code-zip",
   
  },
  {
    id: 2,
    name: "Code Review",
    desc:"Instant Insights: By inputting your code, the AI generates clear, concise explanations to improve learning and debugging efficiency.",
   btn_name:'Review',
   repoApi:":8002/review_repo_code",
   textApi:":8001/review-python-code",
   params:{
    "code": "string"
  },
   zipApi:":8000/review-python-zip"
  
  
  },
  {
    id: 3,
    name: "Code Conversion",
    desc:"Instant Insights: By inputting your code, the AI generates clear, concise explanations to improve learning and debugging efficiency.",
   btn_name:'Conversion',
   repoApi:":8002/convert_repo_code",
   textApi:":8001/convert-perl-to-python",
   params:{
    "code": "string"
  },
   zipApi:":8000/convert-perl-zip"
  
  
  }
 
];



