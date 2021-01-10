# nwHacks 2021 - Backend

## Getting Started

The recommended IDE is [PyCharm](https://www.jetbrains.com/pycharm/). It's available for free for students.
It's recommended that you use a virtual environment to run this project. Follow [this tutorial](https://www.jetbrains.com/help/pycharm/creating-virtual-environment.html#python_create_virtual_env)
to create a new **Virtualenv** environment. Python 3.7+ is recommended.

With a new virtual env, you should now be able to run `pip install -r requirements.txt` to install all the required libraries.

**Starting the Server**

Run `python main.py`. You can do this using PyCharm. Expect to see:
```
INFO:     Started server process [85895]
INFO:     Waiting for application startup.
Startup Called
[nltk_data] Downloading package punkt to /Users/frankjia/nltk_data...
[nltk_data]   Package punkt is already up-to-date!
Initialized app services
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

The service should now be reachable through http://0.0.0.0:8000.

## Endpoints

Currently, the only endpoint is `POST /extract`. It expects the following JSON structure:

```json
{
  "text": "Text you want to extract key sentences from"
}
```

It should respond with this structure:

```json
{
  "sentences": [
    "Important sentence one.",
    "Important sentence two."
  ]
}
```

Here's an example CURL command:
```
curl --request POST \
  --url http://0.0.0.0:8000/extract \
  --header 'Content-Type: application/json' \
  --data '{
	"text": "U.S. President Donald Trump has finally conceded\u00A0the 2020 election to president-elect Joe Biden in a new video\u00A0condemning his violent supporters who stormed the Capitol building on Wednesday.U.S. President Donald Trump finally conceded the 2020 election on Thursday, one day after his supporters stormed the U.S. Capitol.  (Al Drago\/Getty Images)U.S. President Donald Trump has finally conceded the 2020 election to president-elect Joe Biden in a new video condemning his violent supporters who stormed the Capitol building on Wednesday.  In the statement posted to Twitter, Trump declined to mention Biden by name or explicitly admit he'\''d lost the election, instead saying now that Congress has certified the election results, the \"new administration will be inaugurated on January 20\" and his focus now turns to \"ensuring a smooth, orderly and seamless transition of power.\"  He called\u00A0the riot in the Capitol a \"heinous attack\" that left him \"outraged by the violence, lawlessness and mayhem.\" However, in a video to the pro-Trump rioters on Capitol Hill Wednesday, he told them to go home, but also that\u00A0he loved them, that they were special people and that he felt their pain. Twitter removed that video.\u00A0  In the new statement, Trump did not address what Democrats and even some Republicans say was his role in inciting the violence. He\u00A0did say\u00A0he \"immediately deployed the National Guard,\" although it took a long time for order to be restored on Capitol Hill and\u00A0CNN has reported that it was Vice-President Mike Pence who co-ordinated bringing in the troops.\u00A0  In the short message, Trump told\u00A0his supporters that while he knows they are \"disappointed,\"\u00A0their \"incredible journey is only just beginning.\"  WATCH | Trump'\''s statement about the attack on the U.S. Capitol:\u00A0  U.S. President Donald Trump has posted a new video on Twitter, more than 24 hours after an angry mob of his supporters stormed the Capitol building, saying he was outraged by the \"heinous attack.\" He also conceded to president-elect Joe Biden and promised a \"smooth, orderly and seamless transition of power.\" 2:41  '\''We will stop the steal,'\'' Trump told supporters  The address came at the end of a day where\u00A0the\u00A0president stayed out of sight in the White House. Silenced on some of his favourite\u00A0social media\u00A0lines of communication, he didn'\''t comment as several of his top aides, including a cabinet secretary, announced their resignations.  The statement was also a stark reversal for Trump, who has spent months insisting widespread voter fraud cost him\u00A0the Nov. 3 presidential election\u00A0despite providing no evidence.  During a rally in Washington on Wednesday, he encouraged his\u00A0thousands of supporters to\u00A0march to the Capitol to protest the certification of the electoral college vote.  \"We will stop the steal,\" he told the crowd, using the rallying cry of protests against the election results.  A large mob of rioters later overran police officers and invaded the Capitol building, forcing members of Congress into hiding for their own safety.  As recently as Thursday morning, Trump was still maintaining the election was stolen from him.  House Speaker Nancy Pelosi and Senate Minority Leader Chuck Schumer, seen here in August 2020, have called on Vice-President Mike Pence to use the 25th Amendment to oust Trump from office.  (Carolyn Kaster\/The Associated Press)  Before Trump released his video message on Thursday, the top Democrats in Congress, House Speaker Nancy Pelosi and Senate Minority Leader Chuck Schumer, called on Vice-President Mike Pence and Trump'\''s cabinet\u00A0to invoke the 25th Amendment, a provision of the U.S. Constitution that allows a cabinet majority\u00A0to remove the president from power if he is unable to discharge the duties of the office.  How the 25th Amendment could be used to remove Trump from office  But a Pence adviser says\u00A0the vice-president, who would have to lead any such effort, is opposed to using the amendment to oust Trump from the White House.  Barring that, Pelosi\u00A0has said she would likely reconvene the House to initiate impeachment proceedings against Trump for his role in Wednesday'\''s violence, which claimed four lives.  A day later, Republicans and Democrats alike\u00A0struggled with how best to contain the impulses of a president deemed too dangerous to control his own social media accounts but who remains commander-in-chief of the world'\''s largest military.  \"I'\''m not worried about the next election, I'\''m worried about getting through the next 14 days,\" said Republican Sen. Lindsey Graham of South Carolina, one of Trump'\''s staunchest allies. He condemned the president'\''s role in Wednesday'\''s riots and said, \"If something else happens, all options would be on the table.\"  In Pelosi'\''s words,\u00A0\"the president of the United States incited an armed insurrection against America.\" She called him \"a very dangerous person who should not continue in office. This is urgent, an emergency of the highest magnitude.\"  UpdatedJoe Biden blames Trump for violence on Capitol Hill as he picks Merrick Garland for attorney generalU.S. Capitol Police rejected offers of federal help to stop pro-Trump rioters"
}'
```

You should get:

```json
{
  "sentences": [
    "(Al Drago/Getty Images)U.S. President Donald Trump has finally conceded the 2020 election to president-elect Joe Biden in a new video condemning his violent supporters who stormed the Capitol building on Wednesday.",
    "The statement was also a stark reversal for Trump, who has spent months insisting widespread voter fraud cost him the Nov. 3 presidential election despite providing no evidence.",
    "(Carolyn Kaster/The Associated Press)  Before Trump released his video message on Thursday, the top Democrats in Congress, House Speaker Nancy Pelosi and Senate Minority Leader Chuck Schumer, called on Vice-President Mike Pence and Trump's cabinet to invoke the 25th Amendment, a provision of the U.S. Constitution that allows a cabinet majority to remove the president from power if he is unable to discharge the duties of the office.",
    "He condemned the president's role in Wednesday's riots and said, \"If something else happens, all options would be on the table.\"",
    "She called him \"a very dangerous person who should not continue in office.",
    "This is urgent, an emergency of the highest magnitude.\""
  ]
}
```