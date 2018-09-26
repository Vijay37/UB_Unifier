# Librarires Import
import urllib2
from bs4 import BeautifulSoup
from selenium import webdriver
url = "https://calendar.buffalo.edu/";  # URL Page from where we are scraping
browser = webdriver.PhantomJS(); # webdriver to load the data properly
browser.get(url);
html = browser.page_source;
# print(html);
# # parse the html using beautiful soup and store in variable 'soup'
soup = BeautifulSoup(html, 'lxml');
articles = soup.findAll('section',{'class':'list-event-preview'});
print(articles[0].find('p'));
