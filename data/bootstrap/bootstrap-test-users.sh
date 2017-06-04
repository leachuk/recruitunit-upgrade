#!/usr/bin/env bash

#108.61.251.93 = vultr AU bardly host
#104.207.151.30 = vultr US bardly host

#create developer users
curl 'http://104.207.151.30:9000/api/users/signup?modelId=%2Fservices%2Frecruitunit%2Fusers%2FrecruitUnitUserService.controller.js' -H 'Content-Type: application/json' --data-binary '{"email":"developer1@gmail.com","password":"12345678","displayName":"developer1","jobRole":"developer","key":"123456789"}' --compressed
curl 'http://104.207.151.30:9000/api/users/signup?modelId=%2Fservices%2Frecruitunit%2Fusers%2FrecruitUnitUserService.controller.js' -H 'Content-Type: application/json' --data-binary '{"email":"developer2@gmail.com","password":"12345678","displayName":"developer2","jobRole":"developer","key":"123456789"}' --compressed

#create recruiter users
curl 'http://104.207.151.30:9000/api/users/signup?modelId=%2Fservices%2Frecruitunit%2Fusers%2FrecruitUnitUserService.controller.js' -H 'Content-Type: application/json' --data-binary '{"email":"recruiter1@gmail.com","password":"12345678","displayName":"recruiter1","jobRole":"recruiter","key":"123456789"}' --compressed
curl 'http://104.207.151.30:9000/api/users/signup?modelId=%2Fservices%2Frecruitunit%2Fusers%2FrecruitUnitUserService.controller.js' -H 'Content-Type: application/json' --data-binary '{"email":"recruiter2@gmail.com","password":"12345678","displayName":"recruiter2","jobRole":"recruiter","key":"123456789"}' --compressed

#signin users (get auth token for jwt)
curl 'http://104.207.151.30:9000/api/recruitunit/users/signin?password=12345678&username=recruiter1@gmail.com' -H 'Content-Type: application/json' --data-binary '{"username":"recruiter1@gmail.com","password":"12345678"}' --compressed

#get user details (i.e. userGUID to add to /createjobsubmission)
curl 'http://104.207.151.30:9000/api/users/getuser/developer1@gmail.com' -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImRldmVsb3BlcjFAZ21haWwuY29tIiwiY29va2llIjoiQXV0aFNlc3Npb249WkdWMlpXeHZjR1Z5TVVCbmJXRnBiQzVqYjIwNk5Ua3pNalV5TVRnNmExQ0JjVzNPQV9JSXBNT3A2V1ZQYWlGM3ZmRTsgVmVyc2lvbj0xOyBQYXRoPS87IEh0dHBPbmx5Iiwib2siOnRydWUsInJvbGVzIjpbImVkaXRvciIsImRldmVsb3BlciJdLCJpc0NvbXBhcmlzb25Gb3JtRW5hYmxlZCI6dHJ1ZSwidXNlckd1aWQiOiJCeVF5YkprZi0iLCJpcCI6Ijo6ZmZmZjoxMzkuMjE2LjU3LjExNiIsImlhdCI6MTQ5NjQ3MDE1OCwiZXhwIjoxNDk2NDg4MTU4fQ.VqO5AK2EBmblW_-UtVUmzQlMdDydtYsSOq-_rHOvyDA' -compressed

#developer1 create comparison form (update Auth token for new users)
curl -X PUT 'http://104.207.151.30:9000/api/articles/createArticle?modelId=%2Fservices%2Frecruitunit%2Farticles%2FrecruitUnitContentService.controller.js&modelType=%2Fmodels%2FRecruitUnit.ComparisonTest.js' -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJlY3J1aXRlcjFAZ21haWwuY29tIiwiY29va2llIjoiQXV0aFNlc3Npb249Y21WamNuVnBkR1Z5TVVCbmJXRnBiQzVqYjIwNk5Ua3pNalJFTVVJNjEza1NkcUE2LU5GR2oxVURYTzhWTkpuWHdfdzsgVmVyc2lvbj0xOyBQYXRoPS87IEh0dHBPbmx5Iiwib2siOnRydWUsInJvbGVzIjpbImVkaXRvciIsInJlY3J1aXRlciJdLCJ1c2VyR3VpZCI6IkhKd2UtMWt6WiIsImlwIjoiOjpmZmZmOjEzOS4yMTYuNTcuMTE2IiwiaWF0IjoxNDk2NDY4NzY0LCJleHAiOjE0OTkwNjA3NjR9.8wa2OBPsD-czFE5goNF2q1SKjJNIVD8PZuSOEfWiXeo' -H 'Content-Type: application/json' --data-binary '{"roleType":{"value":["contract"],"disabled":false,"rule":"assertStringContains"},"payBracketLower":{"value":130,"disabled":false,"rule":"assertRangeGreaterThan"},"skills":{"value":["java","html","node","AWS","AEM"],"disabled":false,"rule":"assertArrayContains"},"authorEmail":"developer1@gmail.com","createdDate":1496408355967,"locationDescription":{"value":["Melbourne"],"disabled":false,"rule":"assertStringContains"},"published":true}' --compressed
curl -X PUT 'http://104.207.151.30:9000/api/articles/createArticle?modelId=%2Fservices%2Frecruitunit%2Farticles%2FrecruitUnitContentService.controller.js&modelType=%2Fmodels%2FRecruitUnit.ComparisonTest.js' -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImRldmVsb3BlcjFAZ21haWwuY29tIiwiY29va2llIjoiQXV0aFNlc3Npb249WkdWMlpXeHZjR1Z5TVVCbmJXRnBiQzVqYjIwNk5Ua3pNalV5TVRnNmExQ0JjVzNPQV9JSXBNT3A2V1ZQYWlGM3ZmRTsgVmVyc2lvbj0xOyBQYXRoPS87IEh0dHBPbmx5Iiwib2siOnRydWUsInJvbGVzIjpbImVkaXRvciIsImRldmVsb3BlciJdLCJpc0NvbXBhcmlzb25Gb3JtRW5hYmxlZCI6ZmFsc2UsInVzZXJHdWlkIjoiQnlReWJKa2YtIiwiaXAiOiI6OmZmZmY6MTM5LjIxNi41Ny4xMTYiLCJpYXQiOjE0OTY0NzAwNDAsImV4cCI6MTQ5OTA2MjA0MH0.AxGO9SFftUxfT3eaFK16-lqt9puwikwcvTF5HBSb4B0' -H 'Content-Type: application/json'  --data-binary '{"roleType":{"value":["contract"],"disabled":false,"rule":"assertStringContains"},"payBracketLower":{"value":140,"disabled":false,"rule":"assertRangeGreaterThan"},"skills":{"value":["java","html","css","aem","aws"],"disabled":false,"rule":"assertArrayContains"},"authorEmail":"developer1@gmail.com","createdDate":1496470056024,"locationDescription":{"value":[],"disabled":false,"rule":"assertStringContains"},"published":true}' --compressed

#recruiter1 create job content for developer1
curl 'http://104.207.151.30:9000/api/recruitunit/articles/createjobsubmission' -X PUT -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJlY3J1aXRlcjFAZ21haWwuY29tIiwiY29va2llIjoiQXV0aFNlc3Npb249Y21WamNuVnBkR1Z5TVVCbmJXRnBiQzVqYjIwNk5Ua3pNVFl5UWpNNi0zZ21NR3hlbW1iaEx0V1B1RlEtdzRqdmZIbzsgVmVyc2lvbj0xOyBQYXRoPS87IEh0dHBPbmx5Iiwib2siOnRydWUsInJvbGVzIjpbImVkaXRvciIsInJlY3J1aXRlciJdLCJ1c2VyR3VpZCI6IkJKeF9kQUMtVyIsImlwIjoiOjpmZmZmOjEzOS4yMTYuNTcuMTE2IiwiaWF0IjoxNDk2NDA4NzU1LCJleHAiOjE0OTkwMDA3NTV9.ePJvOYRb_0IRZLhsKXnCaTykbieHRB_RUFlDB62FNfo' --data-binary '{"jobDescription":"Pass test for job recruiter1 with Melbourne contract job","currency":"AUD","roleType":"Contract","payBracketLower":130,"payBracketUpper":150,"locationDescription":"Great location in the heart of the Melbourne CBD","skills":["java","aem","aws","foo","bar"],"submitTo":"ByQybJkf-","authorEmail":"recruiter1@gmail.com","published":true}' --compressed
curl 'http://104.207.151.30:9000/api/recruitunit/articles/createjobsubmission' -X PUT -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJlY3J1aXRlcjFAZ21haWwuY29tIiwiY29va2llIjoiQXV0aFNlc3Npb249Y21WamNuVnBkR1Z5TVVCbmJXRnBiQzVqYjIwNk5Ua3pNalJFTVVJNjEza1NkcUE2LU5GR2oxVURYTzhWTkpuWHdfdzsgVmVyc2lvbj0xOyBQYXRoPS87IEh0dHBPbmx5Iiwib2siOnRydWUsInJvbGVzIjpbImVkaXRvciIsInJlY3J1aXRlciJdLCJ1c2VyR3VpZCI6IkhKd2UtMWt6WiIsImlwIjoiOjpmZmZmOjEzOS4yMTYuNTcuMTE2IiwiaWF0IjoxNDk2NDY4NzY0LCJleHAiOjE0OTkwNjA3NjR9.8wa2OBPsD-czFE5goNF2q1SKjJNIVD8PZuSOEfWiXeo' --data-binary '{"jobDescription":"recruiter1 sydney test job","currency":"AUD","roleType":"Contract","payBracketLower":140,"payBracketUpper":160,"locationDescription":"Great Sydney location","skills":["java","aem","aws","foo","bar"],"submitTo":"ByQybJkf-","authorEmail":"recruiter1@gmail.com","published":true}' --compressed
curl 'http://104.207.151.30:9000/api/recruitunit/articles/createjobsubmission' -X PUT -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJlY3J1aXRlcjFAZ21haWwuY29tIiwiY29va2llIjoiQXV0aFNlc3Npb249Y21WamNuVnBkR1Z5TVVCbmJXRnBiQzVqYjIwNk5Ua3pNalJFTVVJNjEza1NkcUE2LU5GR2oxVURYTzhWTkpuWHdfdzsgVmVyc2lvbj0xOyBQYXRoPS87IEh0dHBPbmx5Iiwib2siOnRydWUsInJvbGVzIjpbImVkaXRvciIsInJlY3J1aXRlciJdLCJ1c2VyR3VpZCI6IkhKd2UtMWt6WiIsImlwIjoiOjpmZmZmOjEzOS4yMTYuNTcuMTE2IiwiaWF0IjoxNDk2NDY4NzY0LCJleHAiOjE0OTkwNjA3NjR9.8wa2OBPsD-czFE5goNF2q1SKjJNIVD8PZuSOEfWiXeo' --data-binary '{"jobDescription":"recruiter1 akajhf askjhfsa sakdjfhskfjh","currency":"AUD","roleType":"Contract","payBracketLower":140,"payBracketUpper":160,"locationDescription":"Great Sydney location","skills":["javascript","go","aws","asaf","basFar","sdfsf", "swefqwf", "wwfj"],"submitTo":"ByQybJkf-","authorEmail":"recruiter1@gmail.com","published":true}' --compressed
curl 'http://104.207.151.30:9000/api/recruitunit/articles/createjobsubmission' -X PUT -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJlY3J1aXRlcjFAZ21haWwuY29tIiwiY29va2llIjoiQXV0aFNlc3Npb249Y21WamNuVnBkR1Z5TVVCbmJXRnBiQzVqYjIwNk5Ua3pNalJFTVVJNjEza1NkcUE2LU5GR2oxVURYTzhWTkpuWHdfdzsgVmVyc2lvbj0xOyBQYXRoPS87IEh0dHBPbmx5Iiwib2siOnRydWUsInJvbGVzIjpbImVkaXRvciIsInJlY3J1aXRlciJdLCJ1c2VyR3VpZCI6IkhKd2UtMWt6WiIsImlwIjoiOjpmZmZmOjEzOS4yMTYuNTcuMTE2IiwiaWF0IjoxNDk2NDY4NzY0LCJleHAiOjE0OTkwNjA3NjR9.8wa2OBPsD-czFE5goNF2q1SKjJNIVD8PZuSOEfWiXeo' --data-binary '{"jobDescription":"Suspendisse rhoncus, tortor ut sagittis ornare","currency":"AUD","roleType":"Contract","payBracketLower":140,"payBracketUpper":160,"locationDescription":"North of the river rooftop cinema, brunswick and brunswick st food bloggers","skills":["C++","C#","aws","svsnnds","sasadfbbdfs","erttert", "kfghjjfg", "badfeh"],"submitTo":"ByQybJkf-","authorEmail":"recruiter1@gmail.com","published":true}' --compressed
curl 'http://104.207.151.30:9000/api/recruitunit/articles/createjobsubmission' -X PUT -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJlY3J1aXRlcjFAZ21haWwuY29tIiwiY29va2llIjoiQXV0aFNlc3Npb249Y21WamNuVnBkR1Z5TVVCbmJXRnBiQzVqYjIwNk5Ua3pNalJFTVVJNjEza1NkcUE2LU5GR2oxVURYTzhWTkpuWHdfdzsgVmVyc2lvbj0xOyBQYXRoPS87IEh0dHBPbmx5Iiwib2siOnRydWUsInJvbGVzIjpbImVkaXRvciIsInJlY3J1aXRlciJdLCJ1c2VyR3VpZCI6IkhKd2UtMWt6WiIsImlwIjoiOjpmZmZmOjEzOS4yMTYuNTcuMTE2IiwiaWF0IjoxNDk2NDY4NzY0LCJleHAiOjE0OTkwNjA3NjR9.8wa2OBPsD-czFE5goNF2q1SKjJNIVD8PZuSOEfWiXeo' --data-binary '{"jobDescription":"In eleifend, turpis in sagittis rutrum, sem est maximus ex","currency":"AUD","roleType":"Contract","payBracketLower":140,"payBracketUpper":160,"locationDescription":"Bourke st mall north melbourne shinboners, melb neatly trimmed moustaches fed square ","skills":["C++","C#","aws","svsnnds","sasadfbbdfs","erttert", "kfghjjfg", "badfeh"],"submitTo":"ByQybJkf-","authorEmail":"recruiter1@gmail.com","published":true}' --compressed
curl 'http://104.207.151.30:9000/api/recruitunit/articles/createjobsubmission' -X PUT -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJlY3J1aXRlcjFAZ21haWwuY29tIiwiY29va2llIjoiQXV0aFNlc3Npb249Y21WamNuVnBkR1Z5TVVCbmJXRnBiQzVqYjIwNk5Ua3pNalJFTVVJNjEza1NkcUE2LU5GR2oxVURYTzhWTkpuWHdfdzsgVmVyc2lvbj0xOyBQYXRoPS87IEh0dHBPbmx5Iiwib2siOnRydWUsInJvbGVzIjpbImVkaXRvciIsInJlY3J1aXRlciJdLCJ1c2VyR3VpZCI6IkhKd2UtMWt6WiIsImlwIjoiOjpmZmZmOjEzOS4yMTYuNTcuMTE2IiwiaWF0IjoxNDk2NDY4NzY0LCJleHAiOjE0OTkwNjA3NjR9.8wa2OBPsD-czFE5goNF2q1SKjJNIVD8PZuSOEfWiXeo' --data-binary '{"jobDescription":"Quisque dui mi, vestibulum at lacus ac, dapibus sollicitudin nunc.","currency":"AUD","roleType":"Contract","payBracketLower":140,"payBracketUpper":160,"locationDescription":"hipsters melbourne central swanston etihad stadium mamasita, flemington racecourse brunswick and brunswick st chapel street","skills":["C++","C#","aws","svsnnds","sasadfbbdfs","erttert", "kfghjjfg", "badfeh"],"submitTo":"ByQybJkf-","authorEmail":"recruiter1@gmail.com","published":true}' --compressed
curl 'http://104.207.151.30:9000/api/recruitunit/articles/createjobsubmission' -X PUT -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJlY3J1aXRlcjFAZ21haWwuY29tIiwiY29va2llIjoiQXV0aFNlc3Npb249Y21WamNuVnBkR1Z5TVVCbmJXRnBiQzVqYjIwNk5Ua3pNalJFTVVJNjEza1NkcUE2LU5GR2oxVURYTzhWTkpuWHdfdzsgVmVyc2lvbj0xOyBQYXRoPS87IEh0dHBPbmx5Iiwib2siOnRydWUsInJvbGVzIjpbImVkaXRvciIsInJlY3J1aXRlciJdLCJ1c2VyR3VpZCI6IkhKd2UtMWt6WiIsImlwIjoiOjpmZmZmOjEzOS4yMTYuNTcuMTE2IiwiaWF0IjoxNDk2NDY4NzY0LCJleHAiOjE0OTkwNjA3NjR9.8wa2OBPsD-czFE5goNF2q1SKjJNIVD8PZuSOEfWiXeo' --data-binary '{"jobDescription":"Duis sed dolor mi. Nulla justo diam, suscipit non pharetra sit amet, blandit a nisi.","currency":"AUD","roleType":"Contract","payBracketLower":140,"payBracketUpper":160,"locationDescription":"the crazy wing challenge footy, graffiti world's most liveable city the G' south melb dim sims richmond tigers","skills":["C++","C#","aws","svsnnds","sasadfbbdfs","erttert", "kfghjjfg", "badfeh"],"submitTo":"ByQybJkf-","authorEmail":"recruiter1@gmail.com","published":true}' --compressed
curl 'http://104.207.151.30:9000/api/recruitunit/articles/createjobsubmission' -X PUT -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJlY3J1aXRlcjFAZ21haWwuY29tIiwiY29va2llIjoiQXV0aFNlc3Npb249Y21WamNuVnBkR1Z5TVVCbmJXRnBiQzVqYjIwNk5Ua3pNalJFTVVJNjEza1NkcUE2LU5GR2oxVURYTzhWTkpuWHdfdzsgVmVyc2lvbj0xOyBQYXRoPS87IEh0dHBPbmx5Iiwib2siOnRydWUsInJvbGVzIjpbImVkaXRvciIsInJlY3J1aXRlciJdLCJ1c2VyR3VpZCI6IkhKd2UtMWt6WiIsImlwIjoiOjpmZmZmOjEzOS4yMTYuNTcuMTE2IiwiaWF0IjoxNDk2NDY4NzY0LCJleHAiOjE0OTkwNjA3NjR9.8wa2OBPsD-czFE5goNF2q1SKjJNIVD8PZuSOEfWiXeo' --data-binary '{"jobDescription":"Maecenas sapien mi, dignissim elementum sapien sed, ultrices aliquet tortor. ","currency":"AUD","roleType":"Contract","payBracketLower":140,"payBracketUpper":160,"locationDescription":"Temper trap spring racing carnival, citylink swanston collins place melbourne cricket ground secret laneway bars","skills":["C++","C#","aws","svsnnds","sasadfbbdfs","erttert", "kfghjjfg", "badfeh"],"submitTo":"ByQybJkf-","authorEmail":"recruiter1@gmail.com","published":true}' --compressed
curl 'http://104.207.151.30:9000/api/recruitunit/articles/createjobsubmission' -X PUT -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJlY3J1aXRlcjFAZ21haWwuY29tIiwiY29va2llIjoiQXV0aFNlc3Npb249Y21WamNuVnBkR1Z5TVVCbmJXRnBiQzVqYjIwNk5Ua3pNalJFTVVJNjEza1NkcUE2LU5GR2oxVURYTzhWTkpuWHdfdzsgVmVyc2lvbj0xOyBQYXRoPS87IEh0dHBPbmx5Iiwib2siOnRydWUsInJvbGVzIjpbImVkaXRvciIsInJlY3J1aXRlciJdLCJ1c2VyR3VpZCI6IkhKd2UtMWt6WiIsImlwIjoiOjpmZmZmOjEzOS4yMTYuNTcuMTE2IiwiaWF0IjoxNDk2NDY4NzY0LCJleHAiOjE0OTkwNjA3NjR9.8wa2OBPsD-czFE5goNF2q1SKjJNIVD8PZuSOEfWiXeo' --data-binary '{"jobDescription":"Sed vehicula ante porttitor porta pellentesque.","currency":"AUD","roleType":"Contract","payBracketLower":140,"payBracketUpper":160,"locationDescription":"the rebels pellegrinis middle-aged lycra clad cyclists south melb dim sims footscray hobos","skills":["C++","C#","aws","svsnnds","sasadfbbdfs","erttert", "kfghjjfg", "badfeh"],"submitTo":"ByQybJkf-","authorEmail":"recruiter1@gmail.com","published":true}' --compressed
curl 'http://104.207.151.30:9000/api/recruitunit/articles/createjobsubmission' -X PUT -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJlY3J1aXRlcjFAZ21haWwuY29tIiwiY29va2llIjoiQXV0aFNlc3Npb249Y21WamNuVnBkR1Z5TVVCbmJXRnBiQzVqYjIwNk5Ua3pNalJFTVVJNjEza1NkcUE2LU5GR2oxVURYTzhWTkpuWHdfdzsgVmVyc2lvbj0xOyBQYXRoPS87IEh0dHBPbmx5Iiwib2siOnRydWUsInJvbGVzIjpbImVkaXRvciIsInJlY3J1aXRlciJdLCJ1c2VyR3VpZCI6IkhKd2UtMWt6WiIsImlwIjoiOjpmZmZmOjEzOS4yMTYuNTcuMTE2IiwiaWF0IjoxNDk2NDY4NzY0LCJleHAiOjE0OTkwNjA3NjR9.8wa2OBPsD-czFE5goNF2q1SKjJNIVD8PZuSOEfWiXeo' --data-binary '{"jobDescription":"Urna purus cursus magna, a viverra sem lorem sit amet dolor.","currency":"AUD","roleType":"Contract","payBracketLower":140,"payBracketUpper":160,"locationDescription":"essendon bombers the croft institute cold drip coffee chapel street don dons, shane warne cate blanchette the hawks","skills":["C++","C#","aws","svsnnds","sasadfbbdfs","erttert", "kfghjjfg", "badfeh"],"submitTo":"ByQybJkf-","authorEmail":"recruiter1@gmail.com","published":true}' --compressed
curl 'http://104.207.151.30:9000/api/recruitunit/articles/createjobsubmission' -X PUT -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJlY3J1aXRlcjFAZ21haWwuY29tIiwiY29va2llIjoiQXV0aFNlc3Npb249Y21WamNuVnBkR1Z5TVVCbmJXRnBiQzVqYjIwNk5Ua3pNalJFTVVJNjEza1NkcUE2LU5GR2oxVURYTzhWTkpuWHdfdzsgVmVyc2lvbj0xOyBQYXRoPS87IEh0dHBPbmx5Iiwib2siOnRydWUsInJvbGVzIjpbImVkaXRvciIsInJlY3J1aXRlciJdLCJ1c2VyR3VpZCI6IkhKd2UtMWt6WiIsImlwIjoiOjpmZmZmOjEzOS4yMTYuNTcuMTE2IiwiaWF0IjoxNDk2NDY4NzY0LCJleHAiOjE0OTkwNjA3NjR9.8wa2OBPsD-czFE5goNF2q1SKjJNIVD8PZuSOEfWiXeo' --data-binary '{"jobDescription":"Praesent vel varius nibh, in volutpat lectus.","currency":"AUD","roleType":"Contract","payBracketLower":140,"payBracketUpper":160,"locationDescription":"Bill clinton ate two bowls empire of the sun, movida NGV culture fix the crazy wing challenge cookie brunswick st hippy","skills":["C++","C#","aws","svsnnds","sasadfbbdfs","erttert", "kfghjjfg", "badfeh"],"submitTo":"ByQybJkf-","authorEmail":"recruiter1@gmail.com","published":true}' --compressed
curl 'http://104.207.151.30:9000/api/recruitunit/articles/createjobsubmission' -X PUT -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJlY3J1aXRlcjFAZ21haWwuY29tIiwiY29va2llIjoiQXV0aFNlc3Npb249Y21WamNuVnBkR1Z5TVVCbmJXRnBiQzVqYjIwNk5Ua3pNalJFTVVJNjEza1NkcUE2LU5GR2oxVURYTzhWTkpuWHdfdzsgVmVyc2lvbj0xOyBQYXRoPS87IEh0dHBPbmx5Iiwib2siOnRydWUsInJvbGVzIjpbImVkaXRvciIsInJlY3J1aXRlciJdLCJ1c2VyR3VpZCI6IkhKd2UtMWt6WiIsImlwIjoiOjpmZmZmOjEzOS4yMTYuNTcuMTE2IiwiaWF0IjoxNDk2NDY4NzY0LCJleHAiOjE0OTkwNjA3NjR9.8wa2OBPsD-czFE5goNF2q1SKjJNIVD8PZuSOEfWiXeo' --data-binary '{"jobDescription":"Vestibulum a consequat lacus, id mattis dui.","currency":"AUD","roleType":"Contract","payBracketLower":140,"payBracketUpper":160,"locationDescription":"south of the river the corner hotel temper trap warehouse chic rooftop bars","skills":["C++","C#","aws","svsnnds","sasadfbbdfs","erttert", "kfghjjfg", "badfeh"],"submitTo":"ByQybJkf-","authorEmail":"recruiter1@gmail.com","published":true}' --compressed
curl 'http://104.207.151.30:9000/api/recruitunit/articles/createjobsubmission' -X PUT -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJlY3J1aXRlcjFAZ21haWwuY29tIiwiY29va2llIjoiQXV0aFNlc3Npb249Y21WamNuVnBkR1Z5TVVCbmJXRnBiQzVqYjIwNk5Ua3pNalJFTVVJNjEza1NkcUE2LU5GR2oxVURYTzhWTkpuWHdfdzsgVmVyc2lvbj0xOyBQYXRoPS87IEh0dHBPbmx5Iiwib2siOnRydWUsInJvbGVzIjpbImVkaXRvciIsInJlY3J1aXRlciJdLCJ1c2VyR3VpZCI6IkhKd2UtMWt6WiIsImlwIjoiOjpmZmZmOjEzOS4yMTYuNTcuMTE2IiwiaWF0IjoxNDk2NDY4NzY0LCJleHAiOjE0OTkwNjA3NjR9.8wa2OBPsD-czFE5goNF2q1SKjJNIVD8PZuSOEfWiXeo' --data-binary '{"jobDescription":"Aliquam sem enim, molestie ac porta et, vehicula vel risus. In non nisl a sapien cursus gravida.","currency":"AUD","roleType":"Contract","payBracketLower":140,"payBracketUpper":160,"locationDescription":"the espy ball mamasita the G chopper read, laksa king spring racing carnival shane warne","skills":["C++","C#","aws","svsnnds","sasadfbbdfs","erttert", "kfghjjfg", "badfeh"],"submitTo":"ByQybJkf-","authorEmail":"recruiter1@gmail.com","published":true}' --compressed
curl 'http://104.207.151.30:9000/api/recruitunit/articles/createjobsubmission' -X PUT -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJlY3J1aXRlcjFAZ21haWwuY29tIiwiY29va2llIjoiQXV0aFNlc3Npb249Y21WamNuVnBkR1Z5TVVCbmJXRnBiQzVqYjIwNk5Ua3pNalJFTVVJNjEza1NkcUE2LU5GR2oxVURYTzhWTkpuWHdfdzsgVmVyc2lvbj0xOyBQYXRoPS87IEh0dHBPbmx5Iiwib2siOnRydWUsInJvbGVzIjpbImVkaXRvciIsInJlY3J1aXRlciJdLCJ1c2VyR3VpZCI6IkhKd2UtMWt6WiIsImlwIjoiOjpmZmZmOjEzOS4yMTYuNTcuMTE2IiwiaWF0IjoxNDk2NDY4NzY0LCJleHAiOjE0OTkwNjA3NjR9.8wa2OBPsD-czFE5goNF2q1SKjJNIVD8PZuSOEfWiXeo' --data-binary '{"jobDescription":"Praesent vel varius nibh, in volutpat lectus.","currency":"AUD","roleType":"Contract","payBracketLower":140,"payBracketUpper":160,"locationDescription":"Collingwood ferals a macaron connoisseur, posh brighton don't paint over the banksy's melbourne central","skills":["C++","C#","aws","svsnnds","sasadfbbdfs","erttert", "kfghjjfg", "badfeh"],"submitTo":"ByQybJkf-","authorEmail":"recruiter1@gmail.com","published":true}' --compressed
curl 'http://104.207.151.30:9000/api/recruitunit/articles/createjobsubmission' -X PUT -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJlY3J1aXRlcjFAZ21haWwuY29tIiwiY29va2llIjoiQXV0aFNlc3Npb249Y21WamNuVnBkR1Z5TVVCbmJXRnBiQzVqYjIwNk5Ua3pNalJFTVVJNjEza1NkcUE2LU5GR2oxVURYTzhWTkpuWHdfdzsgVmVyc2lvbj0xOyBQYXRoPS87IEh0dHBPbmx5Iiwib2siOnRydWUsInJvbGVzIjpbImVkaXRvciIsInJlY3J1aXRlciJdLCJ1c2VyR3VpZCI6IkhKd2UtMWt6WiIsImlwIjoiOjpmZmZmOjEzOS4yMTYuNTcuMTE2IiwiaWF0IjoxNDk2NDY4NzY0LCJleHAiOjE0OTkwNjA3NjR9.8wa2OBPsD-czFE5goNF2q1SKjJNIVD8PZuSOEfWiXeo' --data-binary '{"jobDescription":"Proin ex sapien, volutpat vel convallis id, pretium sit amet quam.","currency":"AUD","roleType":"Contract","payBracketLower":140,"payBracketUpper":160,"locationDescription":"Posh brighton old melbourne gaol, formula one grand prix shane warne","skills":["C++","C#","aws","svsnnds","sasadfbbdfs","erttert", "kfghjjfg", "badfeh"],"submitTo":"ByQybJkf-","authorEmail":"recruiter1@gmail.com","published":true}' --compressed
curl 'http://104.207.151.30:9000/api/recruitunit/articles/createjobsubmission' -X PUT -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJlY3J1aXRlcjFAZ21haWwuY29tIiwiY29va2llIjoiQXV0aFNlc3Npb249Y21WamNuVnBkR1Z5TVVCbmJXRnBiQzVqYjIwNk5Ua3pNalJFTVVJNjEza1NkcUE2LU5GR2oxVURYTzhWTkpuWHdfdzsgVmVyc2lvbj0xOyBQYXRoPS87IEh0dHBPbmx5Iiwib2siOnRydWUsInJvbGVzIjpbImVkaXRvciIsInJlY3J1aXRlciJdLCJ1c2VyR3VpZCI6IkhKd2UtMWt6WiIsImlwIjoiOjpmZmZmOjEzOS4yMTYuNTcuMTE2IiwiaWF0IjoxNDk2NDY4NzY0LCJleHAiOjE0OTkwNjA3NjR9.8wa2OBPsD-czFE5goNF2q1SKjJNIVD8PZuSOEfWiXeo' --data-binary '{"jobDescription":"Donec feugiat est odio, quis posuere ligula","currency":"AUD","roleType":"Contract","payBracketLower":140,"payBracketUpper":160,"locationDescription":"richmond tigers brunswick st hippy don dons MSAC ac/dc, brunswick and brunswick st bill","skills":["C++","C#","aws","svsnnds","sasadfbbdfs","erttert", "kfghjjfg", "badfeh"],"submitTo":"ByQybJkf-","authorEmail":"recruiter1@gmail.com","published":true}' --compressed
curl 'http://104.207.151.30:9000/api/recruitunit/articles/createjobsubmission' -X PUT -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJlY3J1aXRlcjFAZ21haWwuY29tIiwiY29va2llIjoiQXV0aFNlc3Npb249Y21WamNuVnBkR1Z5TVVCbmJXRnBiQzVqYjIwNk5Ua3pNalJFTVVJNjEza1NkcUE2LU5GR2oxVURYTzhWTkpuWHdfdzsgVmVyc2lvbj0xOyBQYXRoPS87IEh0dHBPbmx5Iiwib2siOnRydWUsInJvbGVzIjpbImVkaXRvciIsInJlY3J1aXRlciJdLCJ1c2VyR3VpZCI6IkhKd2UtMWt6WiIsImlwIjoiOjpmZmZmOjEzOS4yMTYuNTcuMTE2IiwiaWF0IjoxNDk2NDY4NzY0LCJleHAiOjE0OTkwNjA3NjR9.8wa2OBPsD-czFE5goNF2q1SKjJNIVD8PZuSOEfWiXeo' --data-binary '{"jobDescription":"Aenean non ullamcorper nisl. In et ultricies quam, at finibus nisi.","currency":"AUD","roleType":"Contract","payBracketLower":140,"payBracketUpper":160,"locationDescription":"posh brighton don't paint over the banksy's melbourne central formula one grand prix rooftop cinema","skills":["C++","C#","aws","svsnnds","sasadfbbdfs","erttert", "kfghjjfg", "badfeh"],"submitTo":"ByQybJkf-","authorEmail":"recruiter1@gmail.com","published":true}' --compressed
curl 'http://104.207.151.30:9000/api/recruitunit/articles/createjobsubmission' -X PUT -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJlY3J1aXRlcjFAZ21haWwuY29tIiwiY29va2llIjoiQXV0aFNlc3Npb249Y21WamNuVnBkR1Z5TVVCbmJXRnBiQzVqYjIwNk5Ua3pNalJFTVVJNjEza1NkcUE2LU5GR2oxVURYTzhWTkpuWHdfdzsgVmVyc2lvbj0xOyBQYXRoPS87IEh0dHBPbmx5Iiwib2siOnRydWUsInJvbGVzIjpbImVkaXRvciIsInJlY3J1aXRlciJdLCJ1c2VyR3VpZCI6IkhKd2UtMWt6WiIsImlwIjoiOjpmZmZmOjEzOS4yMTYuNTcuMTE2IiwiaWF0IjoxNDk2NDY4NzY0LCJleHAiOjE0OTkwNjA3NjR9.8wa2OBPsD-czFE5goNF2q1SKjJNIVD8PZuSOEfWiXeo' --data-binary '{"jobDescription":"Suspendisse fermentum molestie leo elementum lobortis.","currency":"AUD","roleType":"Contract","payBracketLower":140,"payBracketUpper":160,"locationDescription":"the espy spring racing carnival south melb dim sims food bloggers vic market","skills":["C++","C#","aws","svsnnds","sasadfbbdfs","erttert", "kfghjjfg", "badfeh"],"submitTo":"ByQybJkf-","authorEmail":"recruiter1@gmail.com","published":true}' --compressed
curl 'http://104.207.151.30:9000/api/recruitunit/articles/createjobsubmission' -X PUT -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJlY3J1aXRlcjFAZ21haWwuY29tIiwiY29va2llIjoiQXV0aFNlc3Npb249Y21WamNuVnBkR1Z5TVVCbmJXRnBiQzVqYjIwNk5Ua3pNalJFTVVJNjEza1NkcUE2LU5GR2oxVURYTzhWTkpuWHdfdzsgVmVyc2lvbj0xOyBQYXRoPS87IEh0dHBPbmx5Iiwib2siOnRydWUsInJvbGVzIjpbImVkaXRvciIsInJlY3J1aXRlciJdLCJ1c2VyR3VpZCI6IkhKd2UtMWt6WiIsImlwIjoiOjpmZmZmOjEzOS4yMTYuNTcuMTE2IiwiaWF0IjoxNDk2NDY4NzY0LCJleHAiOjE0OTkwNjA3NjR9.8wa2OBPsD-czFE5goNF2q1SKjJNIVD8PZuSOEfWiXeo' --data-binary '{"jobDescription":"quis condimentum eros cursus ac. In nec pretium ante.","currency":"AUD","roleType":"Contract","payBracketLower":140,"payBracketUpper":160,"locationDescription":"dont paint over the banksys four seasons in one day, rocking out the espy","skills":["C++","C#","aws","svsnnds","sasadfbbdfs","erttert", "kfghjjfg", "badfeh"],"submitTo":"ByQybJkf-","authorEmail":"recruiter1@gmail.com","published":true}' --compressed
curl 'http://104.207.151.30:9000/api/recruitunit/articles/createjobsubmission' -X PUT -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJlY3J1aXRlcjFAZ21haWwuY29tIiwiY29va2llIjoiQXV0aFNlc3Npb249Y21WamNuVnBkR1Z5TVVCbmJXRnBiQzVqYjIwNk5Ua3pNalJFTVVJNjEza1NkcUE2LU5GR2oxVURYTzhWTkpuWHdfdzsgVmVyc2lvbj0xOyBQYXRoPS87IEh0dHBPbmx5Iiwib2siOnRydWUsInJvbGVzIjpbImVkaXRvciIsInJlY3J1aXRlciJdLCJ1c2VyR3VpZCI6IkhKd2UtMWt6WiIsImlwIjoiOjpmZmZmOjEzOS4yMTYuNTcuMTE2IiwiaWF0IjoxNDk2NDY4NzY0LCJleHAiOjE0OTkwNjA3NjR9.8wa2OBPsD-czFE5goNF2q1SKjJNIVD8PZuSOEfWiXeo' --data-binary '{"jobDescription":"Fusce eget ante sollicitudin quam euismod posuere. Proin ex sapien.","currency":"AUD","roleType":"Contract","payBracketLower":140,"payBracketUpper":160,"locationDescription":"The australian open ball, fed square spiegeltent victory vs heart spencer st station the bulldogs","skills":["C++","C#","aws","svsnnds","sasadfbbdfs","erttert", "kfghjjfg", "badfeh"],"submitTo":"ByQybJkf-","authorEmail":"recruiter1@gmail.com","published":true}' --compressed
curl 'http://104.207.151.30:9000/api/recruitunit/articles/createjobsubmission' -X PUT -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJlY3J1aXRlcjFAZ21haWwuY29tIiwiY29va2llIjoiQXV0aFNlc3Npb249Y21WamNuVnBkR1Z5TVVCbmJXRnBiQzVqYjIwNk5Ua3pNalJFTVVJNjEza1NkcUE2LU5GR2oxVURYTzhWTkpuWHdfdzsgVmVyc2lvbj0xOyBQYXRoPS87IEh0dHBPbmx5Iiwib2siOnRydWUsInJvbGVzIjpbImVkaXRvciIsInJlY3J1aXRlciJdLCJ1c2VyR3VpZCI6IkhKd2UtMWt6WiIsImlwIjoiOjpmZmZmOjEzOS4yMTYuNTcuMTE2IiwiaWF0IjoxNDk2NDY4NzY0LCJleHAiOjE0OTkwNjA3NjR9.8wa2OBPsD-czFE5goNF2q1SKjJNIVD8PZuSOEfWiXeo' --data-binary '{"jobDescription":"Pellentesque sit amet ullamcorper magna, ut dapibus nulla.","currency":"AUD","roleType":"Contract","payBracketLower":140,"payBracketUpper":160,"locationDescription":"Laksa king north melbourne shinboners, running the tan","skills":["C++","C#","aws","svsnnds","sasadfbbdfs","erttert", "kfghjjfg", "badfeh"],"submitTo":"ByQybJkf-","authorEmail":"recruiter1@gmail.com","published":true}' --compressed
curl 'http://104.207.151.30:9000/api/recruitunit/articles/createjobsubmission' -X PUT -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJlY3J1aXRlcjFAZ21haWwuY29tIiwiY29va2llIjoiQXV0aFNlc3Npb249Y21WamNuVnBkR1Z5TVVCbmJXRnBiQzVqYjIwNk5Ua3pNalJFTVVJNjEza1NkcUE2LU5GR2oxVURYTzhWTkpuWHdfdzsgVmVyc2lvbj0xOyBQYXRoPS87IEh0dHBPbmx5Iiwib2siOnRydWUsInJvbGVzIjpbImVkaXRvciIsInJlY3J1aXRlciJdLCJ1c2VyR3VpZCI6IkhKd2UtMWt6WiIsImlwIjoiOjpmZmZmOjEzOS4yMTYuNTcuMTE2IiwiaWF0IjoxNDk2NDY4NzY0LCJleHAiOjE0OTkwNjA3NjR9.8wa2OBPsD-czFE5goNF2q1SKjJNIVD8PZuSOEfWiXeo' --data-binary '{"jobDescription":"ultrices ornare maximus. Aliquam accumsan imperdiet ligula","currency":"AUD","roleType":"Contract","payBracketLower":140,"payBracketUpper":160,"locationDescription":"Tullamarine mamasita, the croft institute the borek woman","skills":["C++","C#","aws","svsnnds","sasadfbbdfs","erttert", "kfghjjfg", "badfeh"],"submitTo":"ByQybJkf-","authorEmail":"recruiter1@gmail.com","published":true}' --compressed
curl 'http://104.207.151.30:9000/api/recruitunit/articles/createjobsubmission' -X PUT -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJlY3J1aXRlcjFAZ21haWwuY29tIiwiY29va2llIjoiQXV0aFNlc3Npb249Y21WamNuVnBkR1Z5TVVCbmJXRnBiQzVqYjIwNk5Ua3pNalJFTVVJNjEza1NkcUE2LU5GR2oxVURYTzhWTkpuWHdfdzsgVmVyc2lvbj0xOyBQYXRoPS87IEh0dHBPbmx5Iiwib2siOnRydWUsInJvbGVzIjpbImVkaXRvciIsInJlY3J1aXRlciJdLCJ1c2VyR3VpZCI6IkhKd2UtMWt6WiIsImlwIjoiOjpmZmZmOjEzOS4yMTYuNTcuMTE2IiwiaWF0IjoxNDk2NDY4NzY0LCJleHAiOjE0OTkwNjA3NjR9.8wa2OBPsD-czFE5goNF2q1SKjJNIVD8PZuSOEfWiXeo' --data-binary '{"jobDescription":"mi metus et ante. In hac habitasse platea dictumst.","currency":"AUD","roleType":"Contract","payBracketLower":140,"payBracketUpper":160,"locationDescription":"trams aami park the emerald peacock","skills":["C++","C#","aws","svsnnds","sasadfbbdfs","erttert", "kfghjjfg", "badfeh"],"submitTo":"ByQybJkf-","authorEmail":"recruiter1@gmail.com","published":true}' --compressed
curl 'http://104.207.151.30:9000/api/recruitunit/articles/createjobsubmission' -X PUT -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJlY3J1aXRlcjFAZ21haWwuY29tIiwiY29va2llIjoiQXV0aFNlc3Npb249Y21WamNuVnBkR1Z5TVVCbmJXRnBiQzVqYjIwNk5Ua3pNalJFTVVJNjEza1NkcUE2LU5GR2oxVURYTzhWTkpuWHdfdzsgVmVyc2lvbj0xOyBQYXRoPS87IEh0dHBPbmx5Iiwib2siOnRydWUsInJvbGVzIjpbImVkaXRvciIsInJlY3J1aXRlciJdLCJ1c2VyR3VpZCI6IkhKd2UtMWt6WiIsImlwIjoiOjpmZmZmOjEzOS4yMTYuNTcuMTE2IiwiaWF0IjoxNDk2NDY4NzY0LCJleHAiOjE0OTkwNjA3NjR9.8wa2OBPsD-czFE5goNF2q1SKjJNIVD8PZuSOEfWiXeo' --data-binary '{"jobDescription":"Praesent venenatis, felis quis pellentesque posuere, ante tortor sodales","currency":"AUD","roleType":"Contract","payBracketLower":140,"payBracketUpper":160,"locationDescription":"storm temper trap, vic market north of the river ","skills":["C++","C#","aws","svsnnds","sasadfbbdfs","erttert", "kfghjjfg", "badfeh"],"submitTo":"ByQybJkf-","authorEmail":"recruiter1@gmail.com","published":true}' --compressed
curl 'http://104.207.151.30:9000/api/recruitunit/articles/createjobsubmission' -X PUT -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJlY3J1aXRlcjFAZ21haWwuY29tIiwiY29va2llIjoiQXV0aFNlc3Npb249Y21WamNuVnBkR1Z5TVVCbmJXRnBiQzVqYjIwNk5Ua3pNalJFTVVJNjEza1NkcUE2LU5GR2oxVURYTzhWTkpuWHdfdzsgVmVyc2lvbj0xOyBQYXRoPS87IEh0dHBPbmx5Iiwib2siOnRydWUsInJvbGVzIjpbImVkaXRvciIsInJlY3J1aXRlciJdLCJ1c2VyR3VpZCI6IkhKd2UtMWt6WiIsImlwIjoiOjpmZmZmOjEzOS4yMTYuNTcuMTE2IiwiaWF0IjoxNDk2NDY4NzY0LCJleHAiOjE0OTkwNjA3NjR9.8wa2OBPsD-czFE5goNF2q1SKjJNIVD8PZuSOEfWiXeo' --data-binary '{"jobDescription":"gravida. Pellentesque sit amet ullamcorper magna","currency":"AUD","roleType":"Contract","payBracketLower":140,"payBracketUpper":160,"locationDescription":"brunswick and brunswick st Rod Laver the australian open","skills":["C++","C#","aws","svsnnds","sasadfbbdfs","erttert", "kfghjjfg", "badfeh"],"submitTo":"ByQybJkf-","authorEmail":"recruiter1@gmail.com","published":true}' --compressed