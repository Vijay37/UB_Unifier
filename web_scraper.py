# Librarires Import
import urllib
from bs4 import BeautifulSoup
from selenium import webdriver
url = "https://calendar.buffalo.edu/";  # URL Page from where we are scraping
browser = webdriver.PhantomJS();
browser.get(url);
html = browser.page_source;
# parse the html using beautiful soup and store in variable 'soup'
soup = BeautifulSoup(html, 'html.parser');
print (soup);
#articles = soup.find('div',attrs={'section':'list-event-preview'});
#print (articles);
