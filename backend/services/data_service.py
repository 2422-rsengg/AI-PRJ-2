"""Data service for loading and processing policyholder data"""
import pandas as pd
import os
from backend.config import CSV_FILE_PATH
from backend.models import Policyholder, PolicyholderStats
from typing import List


class DataService:
    """Service for handling policyholder data"""
    
    _df = None
    
    @classmethod
    def load_data(cls) -> pd.DataFrame:
        """Load CSV data into memory"""
        if cls._df is None:
            if not os.path.exists(CSV_FILE_PATH):
                raise FileNotFoundError(f"CSV file not found at {CSV_FILE_PATH}")
            cls._df = pd.read_csv(CSV_FILE_PATH)
        return cls._df
    
    @classmethod
    def get_all_policyholders(cls) -> List[dict]:
        """Get all policyholders as list of dicts"""
        df = cls.load_data()
        return df.to_dict('records')
    
    @classmethod
    def get_stats(cls) -> dict:
        """Calculate statistics from policyholders data"""
        df = cls.load_data()
        
        # Age distribution
        age_bins = [0, 30, 40, 50, 60, 75]
        age_labels = ['25-30', '31-40', '41-50', '51-60', '61-75']
        age_dist = pd.cut(df['age'], bins=age_bins, labels=age_labels).value_counts().sort_index()
        
        # Salary distribution
        salary_bins = [0, 50000, 100000, 150000, 200000, 300000]
        salary_labels = ['<50K', '50-100K', '100-150K', '150-200K', '200K+']
        salary_dist = pd.cut(df['salary'], bins=salary_bins, labels=salary_labels).value_counts().sort_index()
        
        # Renewal status
        renewal_status = df['status'].value_counts()
        
        return {
            "total_policyholders": len(df),
            "age_distribution": age_dist.to_dict(),
            "salary_distribution": salary_dist.to_dict(),
            "renewal_status_counts": renewal_status.to_dict()
        }
