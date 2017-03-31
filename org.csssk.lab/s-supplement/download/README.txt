-------------------------------------------------------------------
ESDA: an improved approach to accurately identify human snoRNAs 

author : Kai Song <ksong@tju.edu.cn>
         
date   : March 20, 2015

matlan program: Introduction: How it works
-------------------------------------------------------------------
Download from http://www.csssk.net/

1.A comprehensive set of features(i.e.local contiguous structure features, the Z-curve features and so on) were extracted from RNAs sequences. 
   
  the matlab program contains rnafold_tri_feature.m AGA_feature.m ACA_feature.m and Zcurve_feature.m
   
  a). Z-curve features: http://www.csssk.net/publications
     
      Reference: Kai Song£ºRecognition of prokaryotic promoters based on a novel variable-window Z-curve method, Nucleic Acids Research, 2012, 40(3): 963-971
  
  b). The minimum free energy features: RNAfold: Vienna RNA secondary structure server, the Vienna RNA web server at http://rna.tbi.univie.ac.at/.
    
      Reference: Hofacker IL. Vienna RNA secondary structure server. Nucleic acids research 2003;31:3429-31.
  
  c). Local contiguous structure-sequence probabilistic features: downloaded from http://www.csie.ntu.edu.tw/~cjlin/libsvm/oldfiles/

      Reference: Chenghai Xue, Fei Li, Tao He, Guoping Liu, Yanda Li, Xuegong Zhang, Classification of real and pseudo microRNA precursors using local structure-sequence features and support vector machine, BMC Bioinformatics.

2. Elastic Net algorithm;  Download the latest code and documentation from http://www.imm.dtu.dk/projects/spasm

   Reference: 'Regularization and Variable Selection via the Elastic Net' by Hui Zou and Trevor Hastie, 2005.


3. Classification_snoRNAs and other RNAs: SPLSDA, snoRNA_snRNA_identification_splsda.m

   Reference: Lee D, Lee W, Lee Y, Pawitan Y. Sparse partial  least-squares regression and its applications to high-throughput data analysis. Chemometrics and Intelligent Laboratory Systems 2011;109:1-8. 

4. Dataset: 
   
   a).Training dataset: Download the latest snoRNAs sequences from//www-snorna.biotoul.fr//
                        
      Reference: Lestrade L, Weber MJ. snoRNA-LBME-db, a comprehensive database of human H/ACA and C/D box snoRNAs. Nucleic acids research 2006;34:D158-D62.
  
   b).Download the The negative samples sequences from http://www.bioinf.uni-leipzig.de/Publications/SUPPLEMENTS/07-015/?page=publications&sub=SUPPLEMENTS&paperID=07-015
   
      Reference: Hertel J, Hofacker IL, Stadler PF. SnoReport: computational identification of snoRNAs with unknown targets. Bioinformatics 2008;24:158-64.

   c).Validation set: Download the sequences from http://www.ptrnapred.org/download.html

      Reference: Gupta Y, Witte M, Moller S, Ludwig RJ, Restle T, Zillikens D, et al. ptRNApred: computational identification and classification of post-transcriptional RNA. Nucleic Acids Research 2014;42:e167.

5. Note: a).Indispensable sub-programs can be downloaded from the website given.
         
         b).The minimum free energy features: before RNAfold.exe is run on windows computer, ActivePerl must be installed.

   

   

