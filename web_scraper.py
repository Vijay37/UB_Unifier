# Librarires Import
import urllib2
import csv
from bs4 import BeautifulSoup
from selenium import webdriver
url = "https://calendar.buffalo.edu/";  # URL Page from where we are scraping
browser = webdriver.PhantomJS(); # webdriver to load the data properly
browser.get(url);
html = browser.page_source;
#
soup = BeautifulSoup(html, 'lxml');
articles = soup.findAll('section',{'class':'list-event-preview'});
events_date = []
events_desc = []
for article in articles:
    events_date.append(article.find('p').get_text());
    events_desc.append(article.find('h3').get_text())
wtr = csv.writer(open ('out.csv', 'a'), delimiter=',', lineterminator='\n')
for f, b in zip(events_desc, events_date):
    wtr.writerow ([f,b])
