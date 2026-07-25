import React from 'react';
import { Document, Page, Text, View, StyleSheet, renderToStream } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 20,
    borderBottom: '2px solid #2563eb',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 5,
  },
  scoreContainer: {
    backgroundColor: '#f1f5f9',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  score: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  scoreLabel: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 10,
  },
  problemBox: {
    backgroundColor: '#fef2f2',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  problemText: {
    color: '#dc2626',
    fontSize: 12,
  },
  solutionBox: {
    backgroundColor: '#f0fdf4',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  solutionText: {
    color: '#16a34a',
    fontSize: 12,
  },
  listItem: {
    fontSize: 12,
    color: '#334155',
    marginBottom: 4,
    paddingLeft: 10,
  },
  competitorBox: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  competitorName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e293b',
  },
});

export function AuditReportPDF({ order, auditData }: any) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>AI Business Audit</Text>
          <Text style={styles.subtitle}>
            {order.businessName} - {order.city}
          </Text>
        </View>

        <View style={styles.scoreContainer}>
          <Text style={styles.score}>{auditData.score}/100</Text>
          <Text style={styles.scoreLabel}>Presencia Digital</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📱 Instagram</Text>
          <View style={styles.problemBox}>
            <Text style={styles.problemText}>❌ {auditData.instagram_analysis.problem}</Text>
          </View>
          <View style={styles.solutionBox}>
            <Text style={styles.solutionText}>✅ {auditData.instagram_analysis.solution}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📘 Facebook</Text>
          <View style={styles.problemBox}>
            <Text style={styles.problemText}>❌ {auditData.facebook_analysis.problem}</Text>
          </View>
          <View style={styles.solutionBox}>
            <Text style={styles.solutionText}>✅ {auditData.facebook_analysis.solution}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📍 Google Business</Text>
          <View style={styles.problemBox}>
            <Text style={styles.problemText}>❌ {auditData.google_analysis.problem}</Text>
          </View>
          <View style={styles.solutionBox}>
            <Text style={styles.solutionText}>✅ {auditData.google_analysis.solution}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏆 Competencia</Text>
          {auditData.competitors.map((comp: any, index: number) => (
            <View key={index} style={styles.competitorBox}>
              <Text style={styles.competitorName}>{comp.name}</Text>
              {comp.advantages.map((adv: string, i: number) => (
                <Text key={i} style={styles.listItem}>✅ {adv}</Text>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 Plan de Acción 30 Días</Text>
          {auditData.action_plan.map((item: string, index: number) => (
            <Text key={index} style={styles.listItem}>
              {index + 1}. {item}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💡 Ideas de Contenido</Text>
          {auditData.content_ideas.map((idea: string, index: number) => (
            <Text key={index} style={styles.listItem}>
              • {idea}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
}

export async function generatePDF(order: any, auditData: any): Promise<Buffer> {
  const stream = await renderToStream(AuditReportPDF({ order, auditData }));
  
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(chunk as Buffer);
  }
  
  return Buffer.concat(chunks);
}