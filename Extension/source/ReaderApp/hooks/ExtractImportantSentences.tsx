import { useQuery } from 'react-query';
import axios from 'axios';
import { useState, useEffect } from 'react';
import * as React from 'react';


const endpoint = 'http://localhost:8000/extract';

const getImportantText = (text: string) => {
  const [importantText, setImportantText] = useState(null);

  useEffect(() => {
    const fetchImportantText = async () => {
      const res = await axios.post(endpoint, { text: text })
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });;
      setImportantText(res.data.sentenses);
    };

    fetchImportantText();
  }, [text]);

  return importantText;
};
//   useQuery(text, async () => {
//     const res = await axios.post(endpoint, {
//       text,
//     });
//     return res.data;
//   });

/**
 * { data, error, isLoading }
 */

export const TestImportantText = () => {
  const importantText = getImportantText("U.S. President Donald Trump has finally concededu00A0the 2020 election to president-elect Joe Biden in a new videou00A0condemning his violent supporters who stormed the Capitol building on Wednesday.U.S. President Donald Trump finally conceded the 2020 election on Thursday, one day after his supporters stormed the U.S. Capitol.  (Al Drago\/Getty Images)U.S. President Donald Trump has finally conceded the 2020 election to president-elect Joe Biden in a new video condemning his violent supporters who stormed the Capitol building on Wednesday.  In the statement posted to Twitter, Trump declined to mention Biden by name or explicitly admit he'd lost the election, instead saying now that Congress has certified the election results, the \"new administration will be inaugurated on January 20\" and his focus now turns to \"ensuring a smooth, orderly and seamless transition of power.\"  He calledu00A0the riot in the Capitol a \"heinous attack\" that left him \"outraged by the violence, lawlessness and mayhem.\" However, in a video to the pro-Trump rioters on Capitol Hill Wednesday, he told them to go home, but also thatu00A0he loved them, that they were special people and that he felt their pain. Twitter removed that video.u00A0  In the new statement, Trump did not address what Democrats and even some Republicans say was his role in inciting the violence. Heu00A0did sayu00A0he \"immediately deployed the National Guard,\" although it took a long time for order to be restored on Capitol Hill andu00A0CNN has reported that it was Vice-President Mike Pence who co-ordinated bringing in the troops.u00A0  In the short message, Trump toldu00A0his supporters that while he knows they are \"disappointed,\"u00A0their \"incredible journey is only just beginning.\"  WATCH | Trump's statement about the attack on the U.S. Capitol:u00A0  U.S. President Donald Trump has posted a new video on Twitter, more than 24 hours after an angry mob of his supporters stormed the Capitol building, saying he was outraged by the \"heinous attack.\" He also conceded to president-elect Joe Biden and promised a \"smooth, orderly and seamless transition of power.\" 2:41  'We will stop the steal,' Trump told supporters  The address came at the end of a day whereu00A0theu00A0president stayed out of sight in the White House. Silenced on some of his favouriteu00A0social mediau00A0lines of communication, he didn't comment as several of his top aides, including a cabinet secretary, announced their resignations.  The statement was also a stark reversal for Trump, who has spent months insisting widespread voter fraud cost himu00A0the Nov. 3 presidential electionu00A0despite providing no evidence.  During a rally in Washington on Wednesday, he encouraged hisu00A0thousands of supporters tou00A0march to the Capitol to protest the certification of the electoral college vote.  \"We will stop the steal,\" he told the crowd, using the rallying cry of protests against the election results.  A large mob of rioters later overran police officers and invaded the Capitol building, forcing members of Congress into hiding for their own safety.  As recently as Thursday morning, Trump was still maintaining the election was stolen from him.  House Speaker Nancy Pelosi and Senate Minority Leader Chuck Schumer, seen here in August 2020, have called on Vice-President Mike Pence to use the 25th Amendment to oust Trump from office.  (Carolyn Kaster\/The Associated Press)  Before Trump released his video message on Thursday, the top Democrats in Congress, House Speaker Nancy Pelosi and Senate Minority Leader Chuck Schumer, called on Vice-President Mike Pence and Trump's cabinetu00A0to invoke the 25th Amendment, a provision of the U.S. Constitution that allows a cabinet majorityu00A0to remove the president from power if he is unable to discharge the duties of the office.  How the 25th Amendment could be used to remove Trump from office  But a Pence adviser saysu00A0the vice-president, who would have to lead any such effort, is opposed to using the amendment to oust Trump from the White House.  Barring that, Pelosiu00A0has said she would likely reconvene the House to initiate impeachment proceedings against Trump for his role in Wednesday's violence, which claimed four lives.  A day later, Republicans and Democrats alikeu00A0struggled with how best to contain the impulses of a president deemed too dangerous to control his own social media accounts but who remains commander-in-chief of the world's largest military.  \"I'm not worried about the next election, I'm worried about getting through the next 14 days,\" said Republican Sen. Lindsey Graham of South Carolina, one of Trump's staunchest allies. He condemned the president's role in Wednesday's riots and said, \"If something else happens, all options would be on the table.\"  In Pelosi's words,u00A0\"the president of the United States incited an armed insurrection against America.\" She called him \"a very dangerous person who should not continue in office. This is urgent, an emergency of the highest magnitude.\"  UpdatedJoe Biden blames Trump for violence on Capitol Hill as he picks Merrick Garland for attorney generalU.S. Capitol Police rejected offers of federal help to stop pro-Trump rioters");

  if (!importantText) return null;

  return <div>{importantText}</div>;
};

export default getImportantText;